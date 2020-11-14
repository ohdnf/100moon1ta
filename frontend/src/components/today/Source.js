import React, { useState } from 'react';
// import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TimerContainer from '../../containers/typing/TimerContainer';
import Keyboard from './Keyboard';
import Summary from './Summary';
import { saveRecord } from '../../lib/api/game';
// import { useHistory } from 'react-router-dom';

const SourceBlock = styled.div`
  width: 100%;
  background: silver;
`;

const TagBlock = styled.div`
  margin: 1rem 0;
  align-items: center;
  display: flex;
`;

const TagItem = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-right: 0.5rem;
  color: White;
`;

const ContentDiv = styled.div`
  border: 0.25rem solid #808080;
  background: silver;
`;

const DescriptionDiv = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  background: silver;
`;
const LinkDiv = styled.div`
  font-size: 1.25rem;
  backoground: silver;
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
  background: silver;
  margin: 0 0.5rem;
  white-space: pre-wrap;
  border-style: outlet;
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
    if (i === '\r') continue; // C언의 \r\n 핸들링
    chList.push(i);
  }
  if (chList[chList.length] !== '\n') chList.push('\n'); // 마지막에 \n 끝나지 않을때 핸들링`
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
  const [accuracy, setAccuracy] = useState(100);
  const [wrong, setWrong] = useState(0); // 틀린 갯수

  const handleKeyPress = (e) => {
    // console.log(`handleKeyPress ${e}, ${e.key}`)
    if (!start) {
      setStart(new Date());
    }
    // console.log(cursor, chList.length, )
    if (cursor === chList.length - 1) {
      // 현준 수정 => enter가 생김에 따라 변화 핸들링
      // 종료시점
      if (e.key !== 'Enter') return; // 엔터를 누르기 전까진 안 끝내줌
      let dtEnd = new Date();
      let game_time = (dtEnd - start) / 1000;
      let precision = (1 - typo.reduce((a, b) => a + b, 0) / game.length) * 100;
      let score = Math.round((precision * game.length) / game_time);
      let acc = Math.round(((chList.length - wrong) * 100) / chList.length); //정확도
      setPoint(score); // 게임 종료 시 점수 반환, 정확도랑 속도 추가
      setEnd(game_time);
      setAccuracy(acc); //정확도
      let data = {
        game_time: game_time,
        precision: precision,
        typo: JSON.stringify(typoMap),
        score: score,
      };
      saveRecord(data, game.id)
        .then((res) => {
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
      indention = cursor;
      while (chList[indention + 1] === ' ') {
        ++indention;
      }
      setCursor(indention + 1); // 들여쓰기 공백을 건너뛴 Index로 이동
    } else {
      setCursor(cursor + 1); // 평범하게 바로 다음 Index로 이동
    }
    // e.preventDefault()
  };
  const deleteKeyDown = (e) => {
    // console.log(`deleteKeyDown ${e}, ${e.key}`)
    if (e.key === 'Backspace') {
      // indention 뒤로가서 도달하게 되는 cursor 위치
      if (cursor === 0) return; // 더 뒤로갈 공간 X
      indention = cursor - 1; // 기본 한 칸 뒤로

      if (typo[indention] === 1 && wrong !== 0) setWrong(wrong - 1); // 틀렸던 숫자, 다시 되돌리는 코드, 음의 값은 되지 않도록 핸들링

      while (chList[indention] === ' ' && indention !== 0) {
        // 뒤로 이동할 공간이 탭으로 인한 공간일때 핸들링
        --indention;
      }
      if (indention === cursor - 2) {
        setCursor(cursor - 1); // 뒤로 이동할 공간이 탭으로 인한 공간 아니였음!!! 정상적인 한 칸 띄기
      } else {
        setCursor(indention);
      }
      // 백스페이스 시 enter로 가도 되게 변화하였으므로 아래 코드 삭제
      // 백스페이스 시 enter로 커서가 가지 않고 글자로 감
      // if (chList[indention] === '\n') { setCursor(indention - 1)}
      // else { setCursor(indention) }
    }
    // e.preventDefault()
  };

  console.log(cursor, chList[cursor]);
  return (
    <SourceBlock
    // onKeyPress={!end ? handleKeyPress : null}
    // onKeyDown={!end ? deleteKeyDown : null}
    >
      <div>오늘의 타자</div>
      <div>{title}</div>
      <TagBlock>
        {tags.map((tag) => (
          <TagItem key={tag}>{tag}</TagItem>
        ))}
      </TagBlock>
      <TimerContainer start={start} end={end} />
      {/* <ContentDiv>
      </ContentDiv> */}
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
      {point >= 0 && end ? (
        <Summary point={point} accuracy={accuracy} end={end}></Summary>
      ) : (
        <Keyboard />
      )}
    </SourceBlock>
  );
};

export default Source;
