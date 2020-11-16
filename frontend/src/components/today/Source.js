import React, { useState } from 'react';
import styled from 'styled-components';
import TimerContainer from '../../containers/typing/TimerContainer';
import Keyboard from './Keyboard';
import Summary from './Summary';
import { saveRecord } from '../../lib/api/game';

const SourceBlock = styled.div`
  width: 80%;
  margin: auto;
  h1 {
    font-size: 4rem;
    margin: 0.25rem 0;
  }
  h3 {
    font-size: 2rem;
    margin: 0.5rem 0;
  }
  cursor: default;
`;

const TagBlock = styled.div`
  align-items: center;
  display: flex;
  margin: 1rem 0;
  cursor: default;
`;

const TagItem = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0 0.5rem;
  :hover {
    cursor: pointer;
  }
`;

const DescriptionDiv = styled.div`
  margin: 1rem 0;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: default;
`;
const LinkDiv = styled.div`
  font-weight: bold;
  font-size: 1.25rem;
  cursor: default;
`;
const TypingWindow = styled.pre`
  .not-visit {
    color: grey;
  }
  .visit {
    color: black;
  }
  .current {
    background: yellow;
  }
  .incorrect {
    color: white;
    background: red;
  }
  margin: 1rem 0.5rem;
  padding: 0.5rem;
  white-space: pre-wrap;
  border-width: 2px;
  border-style: ridge;
  :hover {
    cursor: pointer;
  }
`;

const Result = styled.div`
`;

let typo = [];
let typoMap = {};

const Source = ({ game }) => {
  let chList = [];
  for (let i of game.content) {
    if (i === "\r") continue;
    chList.push(i);
  }

  if (chList[chList.length - 1] !== "\n") {
    chList.push("\n")
  }

  const { title, tags, description, link } = {
    title: game?.title,
    tags: game?.tags,
    description: game?.description,
    link: game?.link,
  };
  const [cursor, setCursor] = useState(0);

  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const [point, setPoint] = useState(null);

  let indentation = 0;
  const [accuracy, setAccuracy] = useState(100);
  const [wrong, setWrong] = useState(0);

  const handleKeyPress = (e) => {
    e.preventDefault();

    if (!start) {
      setStart(new Date());
      typo = [];
      typoMap = {};
    }
    if (cursor === chList.length - 1) {
      if (e.key !== 'Enter') return;
      let dtEnd = new Date();
      let game_time = (dtEnd - start) / 1000;
      let precision = Number(((1 - typo.reduce((a, b) => a + b, 0) / game.length) * 100).toFixed(2));
      let score = Math.round((precision * game.length) / game_time);
      setPoint(score);
      setEnd(game_time);
      setAccuracy(precision)
      let data = {
        game_time: game_time,
        precision: precision,
        typo: JSON.stringify(typoMap),
        score: score,
      };
      saveRecord(data, game.id)
        .then((res) => {
          alert("기록이 저장되었습니다.")
        })
        .catch((error) => {
          alert("기록 저장에 실패하였습니다.")
          console.error(error);
        });
    }
    if (cursor >= chList.length) return;

    if (e.key === chList[cursor] || (e.key === 'Enter' && chList[cursor] === '\n')) {
      typo[cursor] = 0;
    } else {
      setWrong(wrong + 1);
      typo[cursor] = 1;
      if (typoMap[chList[cursor]]) {
        ++typoMap[chList[cursor]];
      } else {
        typoMap[chList[cursor]] = 1;
      }
    }
    if (chList[cursor] === '\n') {
      indentation = cursor;
      while (chList[indentation + 1] === ' ') {
        ++indentation;
      }
      setCursor(indentation + 1);
    } else {
      setCursor(cursor + 1);
    }
  };
  const deleteKeyDown = (e) => {
    if (e.key === 'Backspace') {
      if (cursor === 0) return;
      indentation = cursor - 1;

      if (typo[indentation] === 1) typo[indentation] = 0;

      while (chList[indentation] === ' ' && indentation !== 0) {
        --indentation;
      }
      if (indentation === cursor - 2) {
        setCursor(cursor - 1);
      } else {
        setCursor(indentation);
      }
    }

    const nowElement = document.querySelector(`.current`)
    if (nowElement) {
      if (nowElement.getBoundingClientRect().top > 700) {
        window.scrollTo(0, window.scrollY + 400);
      }
    }
  };

  return (
    <SourceBlock>
      <h3>타자 연습</h3>
      <h1>{title}</h1>
      <TagBlock>태그:
      {tags.map((tag, index) => (
        <TagItem key={index + tag}>{tag}</TagItem>
      ))}
      </TagBlock>
      <TimerContainer start={start} end={end} />
      <TypingWindow
        tabIndex={0}
        onKeyPress={!end ? handleKeyPress : null}
        onKeyDown={!end ? deleteKeyDown : null}
      >
        {chList.map((ch, index) => (
          <span
            style={{"font-size": "1.75rem"}}
            className={`${typo[index] && index < cursor ? 'incorrect' : 'correct'
              } ${cursor === index
                ? 'current'
                : cursor > index
                  ? 'visit'
                  : 'not-visit'
              }`}
            key={index}
          >
            {ch === '\n' && '↵'}
            {ch}
          </span>
        ))}
      </TypingWindow>
      <DescriptionDiv>설명:{description}</DescriptionDiv>
      <LinkDiv>출처:{link}</LinkDiv>
      {point >= 0 && end &&
        <Result>
          <Summary point={point} accuracy={accuracy} end={end}></Summary>
          <Keyboard typos={typoMap} />
        </Result>
      }
    </SourceBlock>
  );
};

export default Source;
