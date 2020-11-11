import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled, { css } from 'styled-components';
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