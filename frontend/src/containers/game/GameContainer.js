// 구조계획
/*
소스 목록
검색창 div
태그영역 div
  태그들

검색 결과 <> 정렬
소스들
  > 이미지 + 제목 + 태그들 + 북마크
*/

import React, { useEffect, useState } from 'react';
import Search from '../../components/game/Search';
import Result from '../../components/game/Result';
import Pagination from '../../components/game/Pagination';

import { getGames } from '../../lib/api/game';

const GameContainer = () => {
  const [tags, setTags] = useState([]);
  const [query, setQuery] = useState('');
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
        console.error(error.response);
        console.error(error.request);
        console.error(error.message);
      });
  }, []);
  console.log("얍",games)
  games.forEach(game => console.log(game, typeof game))
  return (
    <>
      <Search />
      <Result games={games} />
      <Pagination />

    </>
  );
};

export default GameContainer;
