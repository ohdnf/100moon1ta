import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';

const MainPage = () => {
  const history = useHistory()
  const MainComponent = styled.div`
  text-align: center;
  padding-top: 200px;
  height: 400px;
  h1 {
    font-size: 3rem;
    cursor: default;
  }
  p {
    font-size: 1.5rem;
    cursor: default;
  }
  button {
    font-size: 2rem;
    :hover {
      cursor: pointer;
    }
  }
  `

  return (
    <>
      <Helmet>
        <title>Main | 100moon1ta</title>
      </Helmet>
      <MainComponent>
        <h1>백문이 불여일타</h1>
        <p>백 번 보는 것이 한 번 쳐보는 것만 못하다.</p>
        <button onClick={() => { history.push('/today') }}>연습하러가기</button>
      </MainComponent>
    </>
  );
};

export default MainPage;
