import React, { useEffect, useState } from 'react';
import Search from '../../components/game/Search';
import Result from '../../components/game/Result';
import Pagination from '../../components/game/Pagination';
// 아래는 request 나가는 API
import { getGames } from '../../lib/api/game';
import { getTags } from '../../lib/api/tag';

import PaginationContainer from './PaginationContainer';

const GameContainer = () => {
  const [games, setGames] = useState(null);
  const [mostTags, setMostTags] = useState(null)
  const [query, setQuery] = useState(null)
  const [queryTags, setQueryTags] = useState([])

  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    getGames()
      .then((res) => {
        const gameList = res.data;
        setGames(gameList);
      })
      .catch((error) => {
        console.log(error);
      });
    getTags()
      .then((res) => {
        setMostTags(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  console.log("mostTags", mostTags)
  return (
    <>
      <Search
        mostTags={mostTags}
        query={query}
        setQuery={setQuery}
        queryTags={queryTags}
        setQueryTags={setQueryTags}
      />
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
