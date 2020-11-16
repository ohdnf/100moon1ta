import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import GameContainer from '../containers/game/GameContainer'
import TypingContainer from '../containers/typing/TypingContainer'

const GamePage = () => {
  return (
    <>
      <Helmet>
        <title>GamePage | 100moon1ta</title>
      </Helmet>
      <Switch>
        <Route path="/games" exact component={GameContainer} />
        <Route path="/games/:gameId" component={TypingContainer} />\
      </Switch>
    </>
  );
};

export default GamePage;
