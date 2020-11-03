// 구조계획
/*
소스 목록
검색창 div
태그영역 div
  태그들

검색 결과 <> 정렬
소스들
  > 이미지 + 제목 + 태그들 + 북마크
*/


import React, { useState } from 'react';
import Search from '../../components/game/Search';
import Result from '../../components/game/Result';
import Pagination from '../../components/game/Pagination';

const GameContainer = () => {
  return (
    <>
      <Search />
      <Result />
      <Pagination />
    </>
  );
};

export default GameContainer;
