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
  const [page, setPage] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPage, setMaxPage] = useState();
  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    // setGames([1,2,3,4,5,6,7,8,9,10].map(
    //   (item) =>
    //     ({
    //       id: page*10+item,
    //       title: `${page}${item}항목`,
    //       tags: [
    //         { content: "태그1"},
    //         { content: "태그2"},
    //         { content: "태그3"},
    //       ],
    //       subscribers: []
    //     })))
    // setMaxPage(100)
    console.log("getGames")
    getGames()
      .then((response) => {
        console.log('response받음', response);
        // 성공시 => 뭐가 성공인지는 확인 필요
        if (typeof response.data === 'object') {
          setGames(response.data);
        } else {
          console.log('타입이 object가 아닙니다!', typeof response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        console.error(error.response);
        console.error(error.request);
        console.error(error.message);
      });
    setMaxPage(1);
  }, []);

  // useEffect(() => {
  //   console.log('page 체인지', page);
  //   setGames(
  //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => ({
  //       id: page * 10 + item,
  //       title: `${page}${item}항목`,
  //       tags: [
  //         { content: '태그1' },
  //         { content: '태그2' },
  //         { content: '태그3' },
  //       ],
  //       subscribers: [],
  //     })),
  //   );
  // }, [page]);
  return (
    <>
      <Search />
      <Result games={games} key={page} />
      <Pagination
        page={page}
        setPage={setPage}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        maxPage={maxPage}
      />
    </>
  );
};

export default GameContainer;
