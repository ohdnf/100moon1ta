import React, { useState } from 'react';
import styled from 'styled-components';
import TimerContainer from '../../containers/typing/TimerContainer';
import Keyboard from './Keyboard';
import Summary from './Summary';
import { saveRecord } from '../../lib/api/game'
// import { useHistory } from 'react-router-dom';

const SourceBlock = styled.div`
  width: 100%;
  background: LightGreen;
`;

const TagBlock = styled.div`
  margin: 1rem 0;
  background: DarkSeaGreen;
  align-items: center;
  display: flex;
`;

const TagItem = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-right: 0.5rem;
  background: ForestGreen;
  color: White;
`;

const ContentDiv = styled.div`
  border: 0.25rem solid Black;
  background: LightSteelBlue;
`;

const DescriptionDiv = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  background: LightSalmon;
`;
const LinkDiv = styled.div`
  font-size: 1.25rem;
  backoground: LightSkyBlue;
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
    color: red;
  }
  border: 0.25rem solid Black;
  background: LightSteelBlue;
`;
// cursor: auto / default(화살표) / pointer / wait
let typo = [];
let typoMap = {};

const Source = ({ game, chList }) => {
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

  let indention = 0;

  const handleKeyPress = (e) => {
    if (!start) {
      setStart(new Date());
    }
    if (cursor === chList.length) {
      // 종료시점
      if (e.key === 'Enter') {
        let dtEnd = new Date();
        let game_time = (dtEnd - start) / 1000;
        let precision = (1-((typo.reduce((a, b) => a + b, 0))/game.length))*100;
        let score = Math.round(precision*game.length/game_time);
        setPoint(score); // 게임 종료 시 점수 반환, 정확도랑 속도 추가
        setEnd(game_time);
        let data = {
          game_time : game_time,
          precision : precision,
          typo : JSON.stringify(typoMap),
          score : score,
        }
        saveRecord(data, game.id)
          .then((res) => {
            console.log(res)
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }
    if (cursor >= chList.length) return; // 본문을 초과한 입력 무시
    if (e.key === chList[cursor]) {
      typo[cursor] = 0;
      setCursor(cursor + 1);
    } else if (e.key !== chList[cursor]) {
      typo[cursor] = 1;
      if (typoMap[chList[cursor]]) {
        ++typoMap[chList[cursor]];
      } else {
        typoMap[chList[cursor]] = 1;
      }
      setCursor(cursor + 1);
    }
    // console.log(cursor) // 언제 1++이 되는거지
    if (chList[cursor] === '\n') {
      // 이전 값이 enter면
      indention = cursor;
      while (chList[indention + 1] === ' ') {
        ++indention;
      }
      setCursor(indention + 1);
    }
  };
  const deleteKeyDown = (e) => {
    if (e.key === 'Backspace') {
      if (cursor > 0) {
        setCursor(cursor - 1);
      }
      if (chList[cursor - 1] === ' ') {
        indention = cursor - 1;
        while (chList[indention] === ' ') {
          --indention;
        }
        if (chList[indention] === '\n') {
          setCursor(indention - 1); // 백스페이스 시 enter로 커서가 가지 않고 글자로 감
        }
      }
    }
  };
  return (
    <SourceBlock>
      <div>오늘의 타자</div>
      <div>{title}</div>
      <TagBlock>
        {tags.map((tag) => (
          <TagItem key={tag}>{tag}</TagItem>
        ))}
      </TagBlock>
      <TimerContainer start={start} end={end} />
      <ContentDiv>
        <TypingWindow
          tabIndex={0}
          onKeyPress={!end ? handleKeyPress : null}
          onKeyDown={!end ? deleteKeyDown : null}
        >
          {chList.map((ch, index) => (
            <span
              className={`${
                typo[index] && index < cursor ? 'incorrect' : 'correct'
              } ${
                cursor === index
                  ? 'current'
                  : cursor > index
                  ? 'visit'
                  : 'not-visit'
              }`}
              key={index}
            >
              {ch}
            </span>
          ))}
        </TypingWindow>
      </ContentDiv>
      <DescriptionDiv>설명:{description}</DescriptionDiv>
      <LinkDiv>출처:{link}</LinkDiv>
      {point>=0 && end ? (
        <Summary point={point} end={end}></Summary>
      ) : (
        <Keyboard />
      )}
    </SourceBlock>
  );
};

export default Source;
