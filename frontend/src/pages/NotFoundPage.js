import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 | 100moon1ta</title>
      </Helmet>
      <h1>404 Not Found</h1>
      <Link to="/">Main페이지로 이동</Link>
    </>
  );
};

export default NotFoundPage;
