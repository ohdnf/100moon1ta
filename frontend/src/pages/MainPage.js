import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';

const MainPage = () => {
  const history = useHistory()
  return (
    <>
      <Helmet>
        <title>Main | 100moon1ta</title>
      </Helmet>
      <img
        src={require('../images/logo.jpg')}
        alt="logo1"
        onClick={()=>{history.push('/')}}
      />
      <img
        src={require('../images/logo2.png')}
        alt="logo2"
        onClick={()=>{history.push('/')}}
      />
    </>
  );
};

export default MainPage;
