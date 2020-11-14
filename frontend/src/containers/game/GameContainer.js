import React, { useEffect, useState } from 'react';
import Search from '../../components/game/Search';
import { getGames } from '../../lib/api/game';
import { getTags } from '../../lib/api/tag';

import PaginationContainer from './PaginationContainer';

const GameContainer = () => {
  const [games, setGames] = useState(null);
  const [mostTags, setMostTags] = useState(null)
  const [query, setQuery] = useState(null)
  const [queryTags, setQueryTags] = useState([])

  const onEnter = () => {
    if (!query) {
      alert("검색어를 입력하세요")
    } else {
      const data = {
        query,
        mostTags
      }
    }
  }

  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    getGames()
      .then((res) => {
        const gameList = res.data;
        setGames(gameList);
      })
      .catch((error) => {
        console.error(error);
      });
    getTags()
      .then((res) => {
        setMostTags(res.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, []);

  return (
    <>
      <Search
        mostTags={mostTags}
        setQuery={setQuery}
        queryTags={queryTags}
        setQueryTags={setQueryTags}
        onEnter={onEnter}
      />
      {games ? (
        <>
          <PaginationContainer
            games={games}
          />
        </>
      ) : (
        <div style={{textAlign: "center"}}> 검색 결과가 없습니다.</div>
      )}
    </>
  );
};

export default GameContainer;
