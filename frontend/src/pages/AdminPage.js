import React from 'react';
import { Helmet } from 'react-helmet-async';
import RankContainer from '../containers/admin/AdminContainer';
const AdminPage = () => {
  return (
    <>
      <Helmet>
        <title>AdminPage | 100moon1ta</title>
      </Helmet>
      <RankContainer />
    </>
  );
};

export default AdminPage;