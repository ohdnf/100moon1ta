import React, { useState } from 'react';
// import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TimerContainer from '../../containers/typing/TimerContainer';
import Keyboard from './Keyboard';
import Summary from './Summary';
import { saveRecord } from '../../lib/api/game';
// import { useHistory } from 'react-router-dom';

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
    color: red;
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

// const StyledPre = styled.pre`
//   display: inline;
//   margin: 0;
//   padding: 0;
// `;
// cursor: auto / default(화살표) / pointer / wait

let typo = [];
let typoMap = {};

const Source = ({ game }) => {
  //chList = {game.content.split('')} 받아서 쓰던거 삭제

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
  const [wrong, setWrong] = useState(0); // 틀린 갯수

  const handleKeyPress = (e) => {
    e.preventDefault();
    // console.log("key", e.key);
    // console.log("keyCode", e.keyCode)
    // console.log("typo", typo);
    // console.log("typoMap", typoMap);

    if (!start) {
      setStart(new Date());
      typo = [];
      typoMap = {};
    }
    if (cursor === chList.length-1) {
      // 현준 수정 => enter가 생김에 따라 변화 핸들링
      // 종료시점
      if (e.key !== 'Enter') return; // 엔터를 누르기 전까진 안 끝내줌
      let dtEnd = new Date();
      let game_time = (dtEnd - start) / 1000;
      // console.log(typo.reduce((a, b) => a + b, 0))
      let precision = Number(((1 - typo.reduce((a, b) => a + b, 0) / game.length) * 100).toFixed(2));
      let score = Math.round((precision * game.length) / game_time);
      // let acc = Math.round(((chList.length - wrong) * 100) / chList.length); //정확도
      setPoint(score); // 게임 종료 시 점수 반환, 정확도랑 속도 추가
      setEnd(game_time);
      // setAccuracy(acc); //정확도
      setAccuracy(precision)
      let data = {
        game_time: game_time,
        precision: precision,
        typo: JSON.stringify(typoMap),
        score: score,
      };
      saveRecord(data, game.id)
        .then((res) => {
          // 서버에 결과 전송
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (cursor >= chList.length) return; // 본문을 초과한 입력 무시

    // 1. 맞고 틀리고 판단하는 부분
    if (
      e.key === chList[cursor] ||
      (e.key === 'Enter' && chList[cursor] === '\n') // 현재 ↵의 chrome 값은 10 => \n으로도 되서 다시 수정! 
    ) {
      typo[cursor] = 0; // 맞음
    } else {
      setWrong(wrong + 1);
      typo[cursor] = 1; // 틀림
      if (typoMap[chList[cursor]]) {
        ++typoMap[chList[cursor]];
      } else {
        typoMap[chList[cursor]] = 1;
      }
    }
    // 다음 커서 포인트를 판단하는 부분
    if (chList[cursor] === '\n') {
      // 현재 커서값이 "\n"
      indentation = cursor;
      while (chList[indentation + 1] === ' ') {
        ++indentation;
      }
      setCursor(indentation + 1); // 들여쓰기 공백을 건너뛴 Index로 이동
    } else {
      setCursor(cursor + 1); // 평범하게 바로 다음 Index로 이동
    }
  };
  const deleteKeyDown = (e) => {
    // e.preventDefault();
    // console.log(`deleteKeyDown ${e}, ${e.key}`)
    if (e.key === 'Backspace') {
      // indentation 뒤로가서 도달하게 되는 cursor 위치
      if (cursor === 0) return; // 더 뒤로갈 공간 X
      indentation = cursor - 1; // 기본 한 칸 뒤로

      // if (typo[indentation] === 1 && wrong !== 0) setWrong(wrong - 1); // 틀렸던 숫자, 다시 되돌리는 코드, 음의 값은 되지 않도록 핸들링
      if (typo[indentation] === 1) typo[indentation] = 0; // 틀렸던 숫자, 다시 되돌리는 코드, 음의 값은 되지 않도록 핸들링

      while (chList[indentation] === ' ' && indentation !== 0) {
        // 뒤로 이동할 공간이 탭으로 인한 공간일때 핸들링
        --indentation;
      }
      if (indentation === cursor - 2) {
        setCursor(cursor - 1); // 뒤로 이동할 공간이 탭으로 인한 공간 아니였음!!! 정상적인 한 칸 띄기
      } else {
        setCursor(indentation);
      }
      // 백스페이스 시 enter로 가도 되게 변화하였으므로 아래 코드 삭제
      // 백스페이스 시 enter로 커서가 가지 않고 글자로 감
      // if (chList[indentation] === '\n') { setCursor(indentation - 1)}
      // else { setCursor(indentation) }
    }
  };

  // console.log(cursor, chList[cursor]);

  const nowElement = document.querySelector(`.current`)
  if (nowElement) {
    // console.log("h", nowElement.getBoundingClientRect().top);
    if (nowElement.getBoundingClientRect().top > 700) {
      window.scrollTo(0, window.scrollY + 400);
    }
  }

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
