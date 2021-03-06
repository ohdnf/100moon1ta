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
      this.player__comment = "---";
      this.total_score = "---";
    }
  }

  const currentRank = new Array(30).fill(new Bot());
  for (let i = 0; i < ranking.length; i++) {
    const data = ranking[i];
    data["avg_speed"] = Number((data["avg_speed"] * 60).toFixed(2));
    currentRank[i] = data;
  }

  return (
    <PlayersRank>
      <ol>
        {currentRank.map((e, index) => (
          <li key={index}>
            {e.player__username} | 총 {e.total_score}점 | 분당: {e.avg_speed}타
          </li>
        ))}
      </ol>
    </PlayersRank>
  );
};

export default Rank;
