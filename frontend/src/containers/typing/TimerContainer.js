import React, { useState } from 'react';
import styled from 'styled-components';
import userInterval from '../../lib/interval';

const Timer = styled.div`
  text-align: right;
`

const TimerContainer = ({ start, end }) => {
  const [current, setCurrent] = useState(new Date());
  return (
    <>
      <Timer>
        시간: {end
          ? end
          : !start
            ? '0'
            : Math.floor((current - start) / 1000) >= 1
              ? Math.floor((current - start) / 1000)
              : '0'}
        초
      </Timer>
    </>
  );
};
export default TimerContainer;
