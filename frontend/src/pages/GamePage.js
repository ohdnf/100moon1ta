import React from 'react';
import { Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import GameContainer from '../containers/game/GameContainer'
import TypingContainer from '../containers/typing/TypingContainer'
// 위의것을 바꿔야한다

const GamePage = () => {
  return (
    <>
      <Helmet>
        <title>GamePage | 100moon1ta</title>
      </Helmet>

      {/* <GameContainer /> */}
      <Route path="/games" exact component={GameContainer}/>
      <Route inputCode={"code is my life"} path="/games/:gameId" component={TypingContainer}/>
    </>
  );
};

export default GamePage;
