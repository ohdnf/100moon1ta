import React, { useState } from 'react';
// import styled from 'styled-components';
import userInterval from '../../lib/interval';
const TimerContainer = ({ start, end }) => {
  const [current, setCurrent] = useState(new Date());
  let intervalId = userInterval(
    () => {
      //  왜 -1 나오지
      setCurrent(new Date());
    },
    end ? null : 1000,
  );

  return (
    <>
      <div>
        {end
          ? end
          : !start
          ? '0'
          : Math.floor((current - start) / 1000) >= 1
          ? Math.floor((current - start) / 1000)
          : '0'}
        초
      </div>
    </>
  );
};
export default TimerContainer;
