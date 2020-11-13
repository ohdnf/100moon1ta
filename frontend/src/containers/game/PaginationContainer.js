import React, { useEffect, useState } from 'react';
import Result from '../../components/game/Result';
import Pagination from '../../components/game/Pagination';

const PaginationContainer = ({ games }) => {
  const numOfGames = games.length
  // 초기 페이지네이션 : 1 ~ step || 마지막 페이지
  const [step, setStep] = useState(10);
  const [endOfPage, setEndOfPage] = useState(Math.ceil(numOfGames / step))
  const [start ,setStart] = useState(1)
  const [page, setPage] = useState(1);//현재 페이지
  const [displayedGame, setDisplayedGame] = useState(games.slice(0, page < step ? page : step));

  // 페이지네이션 동작
  const onRight = () => {
    if (start+10 > endOfPage) return// 동작X
    setStart(start+10)
  }
  const onLeft = () => {
    if (start-10 < 1) return // 동작X
    setStart(start-step)
  }
  const onClick = (numOfPage) => {
    setPage(numOfPage)
  }
  useEffect(() => {
    if ( endOfPage !== Math.ceil(numOfGames / step) ) {
      setEndOfPage(Math.ceil(numOfGames / step))
    }
    setStart(1)
    setPage(1)
    }, [step, setStep])

  useEffect(() => {
    // 현재 페이지 page의 업데이트에 맞춰 displayedGame 변경
    if (page < 1 || page > endOfPage) return; // 잘못된 요청
    setDisplayedGame(games.slice((page-1)*step, (page)*step)) // slice는 초과해도 괜춘!
  }, [page, setPage, step, setStep])


  return (
    <>
      <Result
        games={displayedGame}
        step={step}
        setStep={setStep}
      />
      <Pagination
        page={page}
        start={start}
        endOfPage={endOfPage}
        disableRight={start+10 > endOfPage}
        disableLeft={start-10 < 1}
        onRight={onRight}
        onLeft={onLeft}
        onClick={onClick}
      >
      </Pagination>
    </>
  )
};

export default PaginationContainer;
