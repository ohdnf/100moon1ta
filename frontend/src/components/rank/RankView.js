import React, { useState, useEffect } from 'react';
import { getRanking } from '../../lib/api/rank';

const Rank = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    getRanking()
      .then((response) => {
        if (typeof response.data === 'object') {
          setRanking(response.data);
        } else {
          console.log('타입이 object가 아닙니다!', typeof response.data);
        }
      })
      .catch((error) => {
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

  return (
    <ol>
      {ranking.map((e, index) => (
        <li key={index}>
          {e.player__username} : {e.total_score}
        </li>
      ))}
    </ol>
  );
};

export default Rank;
