import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getRanking } from '../../lib/api/rank';

const PlayersRank = styled.div`
  text-align: center;
  list-style-position: inside;
  cursor: default;
`

const Rank = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    getRanking()
      .then((response) => {
        // 성공시 => 뭐가 성공인지는 확인 필요
        if (typeof response.data === 'object') {
          setRanking(response.data);
          console.log(response.data)
        } else {
          console.log('타입이 object가 아닙니다!', typeof response.data);
        }
      })
      .catch((error) => {
        // 에러를 출력해주는 3가지 방식 => 각각 작동하는 환경이 다름
        console.error(error.response);
        console.error(error.request);
        console.error(error.message);
      });
  }, []);

  class Bot {
    constructor() {
      this.avg_precision = "---";
      this.avg_speed = "---";
      this.game_count = "---";
      this.player__username = "---";
      this.player__commnet = "---";
      this.total_score = "---";
    }
  }

  const currentRank = new Array(30).fill(new Bot());
  for (let i = 0; i < ranking.length; i++) {
    currentRank[i] = ranking[i]
  }
  // console.log(currentRank)

  return (
    <PlayersRank>
      <ol>
        {currentRank.map((e, index) => (
          <li key={index}>
            {e.player__username} | 총 {e.total_score}점 | 평균 속도: {e.avg_speed}타
          </li>
        ))}
      </ol>
    </PlayersRank>
  );
};

export default Rank;
