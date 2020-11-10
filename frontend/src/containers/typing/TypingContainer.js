import React, { useState } from 'react';
import GameContainer from './GameContainer';

const TypingContainer = () => {
  //code는 아직 하드코딩
  const code = "def life():\n    coding = 'veryhard'\n    return die";
  const chList = code.split('');
	const [id, setId] = useState('123');
  return (
    <>
      <GameContainer key={id} chList={chList}/>
      <button onClick={()=> setId(Math.random().toString())}>새로시작</button>
    </>
  );
};

export default TypingContainer;
