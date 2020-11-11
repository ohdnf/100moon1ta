import React, { useEffect, useState } from 'react';
import Search from '../../components/game/Search';
import Result from '../../components/game/Result';
import Pagination from '../../components/game/Pagination';
// 아래는 request 나가는 API
import { getGames } from '../../lib/api/game';
// 아래는 샘플데이터 생성코드
import sampleData from '../../sampleData'

const GameContainer = () => {
  // const [tags, setTags] = useState([]);
  // const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);
  const [numOfGames, setNumOfGames] = useState(0);
  const [page, setPage] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPage, setMaxPage] = useState();
  const settingForPage = (n) => {
    // 구동 초반 세팅
    if (n > 0) {
      setNumOfGames(n) // 게임의 갯수는 n개
      setPage(1) // 시작 페이지는 1
      setPageIndex(1) // For pagination, 시작 페이지인덱스는 1
      setMaxPage(Math.ceil(n/10)) // 끝 페이지
    }
  }
  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    getGames()
      .then((response) => {
        const gameList = response.data
        setGames(gameList)
        settingForPage(gameList.length)
      })
      .catch((error) => {
        console.log(error);
        console.error(error.response);
        console.error(error.request);
        console.error(error.message);
      });

    // //아래 코드는 목업데이터활용 => API로 바꿔주면 됩니다.
    // const { numberOfGames } = sampleData.getGames(123) // 데이터 갯수. 
    // // setGames(firstPageOfGames) // getGames로 첫페이지 데이터 받아온다면.
    // settingForPage(numberOfGames)
  }, []);

  useEffect(() => {
    if(page === 0) return;
    if(page > 0) {
      getGames()
      .then((response) => {
        const gameList = response.data
        setGames(gameList)
      })
      .catch((error) => {
        console.log(error);
        console.error(error.response);
        console.error(error.request);
        console.error(error.message);
      });
    }
  }, [page, maxPage]);
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
