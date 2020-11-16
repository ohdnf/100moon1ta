import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { socialJWT } from '../lib/api/user';
import queryString from 'query-string';
import client from '../lib/api/client';

const LoginCompletePage = ( { location } ) => {
  const { user, token, error } = useSelector(({ user }) => ({
    user: user.user,
    error: user.error,
    token: user.token,
  }));

  const query = queryString.parse(location.search)
  // const dispatch = useDispatch();
  
  useEffect(() => {
    socialJWT(query)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        client.defaults.headers.common['Authorization'] = 'JWT ' + response.data.token;
      })
      .catch((err) => console.error(err))
  });

  return (
    <>
      <Helmet>
        <title>Loginpage | 100moon1ta</title>
      </Helmet>
      <h1>로그인 완료!</h1>
      <button onClick={ () => window.close() }>완료 버튼</button>
    </>
  );
};

export default LoginCompletePage;
