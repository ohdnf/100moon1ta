import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import sampleData from '../../sampleData'

import { ResultItem } from '../../components/game/Result'

import { getBookmarkedGames } from '../../lib/api/user'

const BookmarkContainer = () => {
  // 유저 정보 => redux
  const [bookmarkedGame, setBookmarkedGame] = useState([])
  const [msg, setMsg] = useState("북마킹된 소스가 없져...")
  const { user } = useSelector(({user})=>({
    user: user.user
  }))
  useEffect(()=>{
    // 1. 북마크한 소스들 받아오기
    getBookmarkedGames()
    .then((res) => {
      // 아래 코드 동작하는지 확인 요망
      const gameList = res.data.sources 
      setBookmarkedGame(gameList)
    })
    .catch((err) => {
      const error = err.response
      if (error.status === 404 ){
        console.log("기록이 없습니다.")
      } else {
        console.log("에러가 발생했습니다.")
        setMsg("로드중 에러가 발생했습니다.")
      }
    })
  }, [])
  return (
    <>
      {bookmarkedGame.length === 0?
        <div>{msg}</div>
      :
      <>
       { bookmarkedGame.map((game) => <ResultItem key={game.id} game={game} />) }
      </>
      }
    </>
  )

};

export default BookmarkContainer;

/*
  {
    "sources": [
        {
            "id": 2,
            "title": "Crime report through.",
            "description": "Writer raise argue walk edge.",
            "link": "avery.info",
            "category": "T",
            "content": "Foreign year source real manager strategy seek. Name audience car score site must.",
            "length": 6543448,
            "difficulty": 2
        },
    ]
}
*/