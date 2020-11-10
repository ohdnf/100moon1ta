import React from 'react';
import { Helmet } from 'react-helmet-async';
import Game from '../components/game/Game'

const GamePage = () => {
  const code = "asdfasdf"
  return (
  <>
    <Helmet>
      <title>TypingPage | 100moon1ta</title>
    </Helmet>
    <Game inputCode={code}/>
  </>
  );
};

export default GamePage;
