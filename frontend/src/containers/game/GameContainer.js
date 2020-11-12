import React, { useEffect, useState } from 'react';
import Search from '../../components/game/Search';
import Result from '../../components/game/Result';
import Pagination from '../../components/game/Pagination';
// 아래는 request 나가는 API
import { getGames } from '../../lib/api/game';

import PaginationContainer from './PaginationContainer';

const GameContainer = () => {
  const [games, setGames] = useState(null);

  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    getGames()
      .then((response) => {
        const gameList = response.data;
        setGames(gameList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Search />
      {games ? (
        <>
          <PaginationContainer
            games={games}
          />
        </>
      ) : (
        <div> 검색 결과가 없습니다.</div>
      )}
    </>
  );
};

export default GameContainer;
