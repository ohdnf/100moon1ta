import React, { useState } from 'react';
import styled from 'styled-components';
import TimerContainer from './TimerContainer';
// import ResultContainer from './Result';

// 브라우저마다 keycode는 다르다^^
// 한글 입력시 키보드마다 IME란 놈 때문에 입력에 keycode=229가 들어간다^^
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
`;
// const Timer = styled.div``;

let typo = [];
let typoMap = [];

const GameContainer = ({ chList }) => {

  const [cursor, setCursor] = useState(0);

	const [start, setStart] = useState();
  const [end , setEnd] = useState();

  const [point, setPoint] = useState();
  
  let indention = 0;
  
  const handleKeyPress = (e) => {
		if (!start) {
			setStart(new Date());
		}
		if (cursor === chList.length) {  // 종료시점
			if (e.key === 'Enter') {
        let dtEnd = new Date();
        setPoint(100)  // 게임 종료 시 점수 반환, 정확도랑 속도 추가
				setEnd((dtEnd-start)/1000)
			}
		} 
    if (cursor < chList.length){
			
			if (e.key === chList[cursor]) {
					typo[cursor] = 0;
					setCursor(cursor + 1);
			} else if (e.key !== chList[cursor]) {
				typo[cursor] = 1;
				if (typoMap[chList[cursor]]) {
					++typoMap[chList[cursor]]
				} else {
					typoMap[chList[cursor]] = 1
				}
				setCursor(cursor + 1);
			}
			// console.log(cursor) // 언제 1++이 되는거지
			if (chList[cursor] === '\n') { // 이전 값이 enter면
				indention = cursor;
				while (chList[indention+1] === ' ') {
					++indention;
				}
				setCursor(indention+1);
			}
		}
  };
  const deleteKeyDown = (e) => {
    if (e.key === 'Backspace') {
        if (cursor > 0) {
          setCursor(cursor - 1);
				}
				if (chList[cursor - 1] === ' '){
					indention = cursor - 1;
					while ( chList[indention] === ' ') {
						--indention
					}
					if (chList[indention] === '\n') {
						setCursor(indention-1) // 백스페이스 시 enter로 커서가 가지 않고 글자로 감
					}
				}
		}
	}
  return (
    <>
      <TypingWindow tabIndex={0} onKeyPress={ !end ? handleKeyPress : null} onKeyDown={ !end ? deleteKeyDown : null}> 
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
			<TimerContainer start={start} end={end}/>
      <div>
				point: {point}
			</div>
    </>
  );
};

export default GameContainer;
