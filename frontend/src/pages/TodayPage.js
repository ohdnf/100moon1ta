import React from 'react';
import { Helmet } from 'react-helmet-async';
import TodayContainer from '../containers/today/TodayContainer'

const TodayPage = () => {
  return (
    <>
      <Helmet>
        <title>TodayPage | 100moon1ta</title>
      </Helmet>
      <TodayContainer />
    </>
  );
};

export default TodayPage;
