import React, { useState } from 'react';
import userInterval from '../../lib/interval';
const TimerContainer = ({ start, end }) => {
  const [current, setCurrent] = useState(new Date());
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
