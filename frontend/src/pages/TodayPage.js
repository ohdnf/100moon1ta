import React from 'react';
import { Helmet } from 'react-helmet-async';
import TypingContainer from '../containers/typing/TypingContainer'

const TodayPage = () => {
  return (
    <>
      <Helmet>
        <title>TodayPage | 100moon1ta</title>
      </Helmet>
      <TypingContainer />
    </>
  );
};

export default TodayPage;
