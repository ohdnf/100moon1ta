import React, { useEffect, useState } from 'react';
import sampleData from '../../sampleData'

import { ResultItem } from '../../components/game/Result'

const BookmarkContainer = () => {
  // 유저 정보 => redux
  const [bookmarkedGame, setBookmarkedGame] = useState([]);
  useEffect(()=>{
    // 1. 북마크한 소스들 받아오기
    // 아래는 목업데이터 => API로 변경해야함
    setBookmarkedGame(bookmarkedGame.concat(sampleData.getBookmarkedGame(5))) //n개의 데이터 생성
  }, [])
  
  return (
    <>
      {bookmarkedGame.length === 0?
        <div>북마킹된 소스가 없져...</div>
      :
      <>
       { bookmarkedGame.map((game) => <ResultItem key={game.id} game={game} />) }
      </>
      }
    </>
  )

};

export default BookmarkContainer;
