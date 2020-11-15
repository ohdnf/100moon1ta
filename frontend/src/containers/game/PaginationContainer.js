import React, { useEffect, useState } from 'react';
import Result from '../../components/game/Result';
import Pagination from '../../components/game/Pagination';

const PaginationContainer = ({ games }) => {
  const numOfGames = games.length;
  const [step, setStep] = useState(10);
  const [endOfPage, setEndOfPage] = useState(Math.ceil(numOfGames / step));
  const [page, setPage] = useState(1);
  const [displayedGame, setDisplayedGame] = useState(games.slice(0, page < step ? page : step));

  const onRight = () => {
    if (page + 1 > endOfPage) return;
    setPage(page + 1);
  };
  const onLeft = () => {
    if (page - 1 < 1) return;
    setPage(page - 1);
  };
  const onClick = (numOfPage) => {
    setPage(numOfPage);
  };
  useEffect(() => {
    if (endOfPage !== Math.ceil(numOfGames / step)) {
      setEndOfPage(Math.ceil(numOfGames / step))
    };
    setPage(1);
  }, [step, setStep]);

  useEffect(() => {
    if (page < 1 || page > endOfPage) return;
    setDisplayedGame(games.slice((page - 1) * step, (page) * step));
  }, [page, setPage, step, setStep]);


  return (
    <>
      <Result
        games={displayedGame}
        step={step}
        setStep={setStep}
      />
      <Pagination
        page={page}
        endOfPage={endOfPage}
        disableRight={page + 1 > endOfPage}
        disableLeft={page - 1 < 1}
        onRight={onRight}
        onLeft={onLeft}
        onClick={onClick}
      >
      </Pagination>
    </>
  )
};

export default PaginationContainer;
