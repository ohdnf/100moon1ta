import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Source from '../../components/today/Source';
import { getGame } from '../../lib/api/game';
import { getTodaySource } from '../../lib/api/today';

const Buttons = styled.div`
  margin: 1rem auto;
  padding: 0rem 1rem;
  width: 80%;
`;

const TypingContainer = ({ location, match }) => {
  const [gameId, setGameId] = useState(
    window.location.pathname === '/today' ? 0 : parseInt(match?.params?.gameId),
  );
  const [game, setGame] = useState(null);
  const [num, setNum] = useState(0);
  const history = useHistory()
  useEffect(() => {
    if (isNaN(gameId) || gameId < 0) history.push('/404') // 잘 못된 접근시 404페이지로 이동
    if (gameId === 0) { // /today로 첫 입장시 or 다른게임 버튼 입력시 랜덤 소스 로드
      getTodaySource()
        .then((res) => {
          
          const gameData = res.data;
          setGame({
            ...gameData,
          });
          setGameId(res.data.id);
        })
        .catch((err) => console.log(err));
    } else if (gameId !== game?.id) {
      getGame(gameId).then((res) => { // path의 파라미터에서 gameId값을 찾아 해당 소스 로드
        const gameData = res.data;
        setGame({
          ...gameData,
        });
      });
    }
  }, [gameId]);

  if (!gameId || !game?.content) {
    return <div>로딩중</div>;
  }

  return (
    <>
      <Source
        key={num}
        gameId={gameId}
        game={game}
      />
      <Buttons>
        <button onClick={() => setNum(num+1)}>다시하기</button>
        {window.location.pathname === '/today' && (
          <button
            onClick={() => {
              setGameId(0); // /today로 입장 === gameId = 0 을 활용
              setNum(num+1);
            }}
          >
            다른게임
          </button>
        )}
      </Buttons>
    </>
  );
};

export default TypingContainer;
