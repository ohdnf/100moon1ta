import React from 'react';
import { Helmet } from 'react-helmet-async';
import GameContainer from '../containers/game/GameContainer'
const GamePage = () => {
  return (
    <>
      <Helmet>
        <title>GamePage | 100moon1ta</title>
      </Helmet>
      <GameContainer />
    </>
  );
};

export default GamePage;
