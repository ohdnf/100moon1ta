import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Result from '../game/Result'

import { getGames } from '../../lib/api/game'
const SourceBlock = styled.div`
  background: Azure;
  border: 0.25rem solid BlueViolet;
`;
const SourceTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bolder;
`;

const SourceInput = styled.input`
  margin: 1rem;
  width: 95%;
`;
const TagBlock = styled.div`
  margin: 0.25rem;
  display: flex;
  background: Aquamarine;
`;

const TagItem = styled.div`
  margin-right: 0.25rem;
  padding: 0.25rem;
  background: DodgerBlue;
  border: 0.01rem solid black;
  border-radius: 0.5rem;
  text-align: center;
`;

const Source = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    getGames()
      .then((response) => {
        console.log("response받음", response.data, typeof response.data);
        // 성공시 => 뭐가 성공인지는 확인 필요
        if (typeof response.data === 'object') {
          setGames(response.data);
        } else {
          console.log('타입이 object가 아닙니다!', typeof response.data);
        }
      })
      .catch((error) => {
        // 에러를 출력해주는 3가지 방식 => 각각 작동하는 환경이 다름
        console.error(error.response);
        console.error(error.request);
        console.error(error.message);
      });
  }, []);
  
  return (
    <SourceBlock>
      <Result games={games}/>          
    </SourceBlock>
  );
};

export default Source;
