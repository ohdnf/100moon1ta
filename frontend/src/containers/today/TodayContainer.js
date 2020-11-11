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
import { getTodaySource } from '../../lib/api/today'
import { useEffect } from 'react';
const TodayContainer = () => {
  //
  const { todayContent, setTodayContent } = useState({})
  // const { hitmap, setHitmap } = useState({})
  // const { startTime, setStartTime } = useState("")
  // const { ok, setOk } = useState(0)

  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    getTodaySource()
      .then((response) => {
        console.log(response)
        if (typeof response.data === 'object') {
          setTodayContent(response.data);
        } else {
          console.log('타입이 object가 아닙니다!', typeof response.data);
        }
      })
      .catch((error) => {
        // 1.  요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        // data, status, headers
        console.error(error.response);
        // 2. 요청이 우리어졌으나 응답을 받지 못했습니다.
        // error.request 는 브라우저의 XMLHttpRequest 인스턴스 or Node.js의 http.ClientRequest 인스턴스 입니다.
        console.error(error.request);
        // 3. error.message
        console.error(error.message);
      });
  }, []);

  return (
    <>
      <Source todayContent={todayContent}/>
      <Summary />
      <Keyboard />
      <Button> 다시 연습 하기 </Button>
      <Button> 다음 소스 연습 </Button>
    </>
  );
};

export default TodayContainer;
