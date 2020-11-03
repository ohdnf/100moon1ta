// 구조계획
// 1. 오늘의 타자
// 2. 소스 정보
// 제목, 태그들, 내용, 설명
// 3. 키보드 레이아웃
// 4. 결과
// 타자 연습 Summary
// 점수 선정 방식 안내
// 히트맵

import React, { useState } from 'react';
import Source from '../../components/today/Source';
import Summary from '../../components/today/Summary';
import Keyboard from '../../components/today/Keyboard';
import Button from '../../components/common/Button';

const TodayContainer = () => {
  return (
    <>
      <Source />
      <Summary />
      <Keyboard />
      <Button> 다시 연습 하기 </Button>
      <Button> 다음 소스 연습 </Button>
    </>
  );
};

export default TodayContainer;
