import React, { useEffect, useState } from 'react';
import Source from '../../components/today/Source';
import { getGame } from '../../lib/api/game';

const TypingContainer = ({ location, match }) => {
  const max = 20;
  const min = 1;
  const setRandomGameId = () => Math.floor(Math.random() * (max + 1 - min) + min);
  const initialGameId =
    window.location.pathname === '/today'
      ? setRandomGameId()
      : match?.params?.gameId;
  const [gameId, setGameId] = useState(initialGameId);
  const [game, setGame] = useState(null);
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (!gameId) {
      console.log("에러발생")
      return;
    }
    getGame(gameId).then((res) => {
      const gameData = res.data;
      setGame({
        ...gameData,
      });
    });
  }, [gameId]);

  if (!gameId || !game?.content) {
    return <div>로딩중</div>;
  }

  return (
    <>
      <Source key={num} gameId={gameId} game={game} chList={game.content.split('')} />
      <button onClick={() => setNum(setRandomGameId())}>다시하기</button>
      { window.location.pathname === '/today' &&
        <button onClick={() => {setGameId(setRandomGameId()); setNum(setRandomGameId())}}>다른게임</button>
      }
    </>
  );
};

export default TypingContainer;
