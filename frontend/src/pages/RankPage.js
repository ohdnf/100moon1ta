import React from 'react';
import { Helmet } from 'react-helmet-async';
import RankContainer from '../containers/rank/RankContainer.js';
const RankPage = () => {
  return (
    <>
      <Helmet>
        <title>RankPage | 100moon1ta</title>
      </Helmet>
      <RankContainer />
    </>
  );
};

export default RankPage;
