import React, { useEffect, useState } from 'react';
import { ResultItem } from '../../components/game/Result'
import { getBookmarkedGames } from '../../lib/api/user'

const BookmarkContainer = () => {
  const [bookmarkedGame, setBookmarkedGame] = useState([])
  const [msg, setMsg] = useState("북마킹된 소스가 없습니다.")

  useEffect(() => {
    getBookmarkedGames()
      .then((res) => {
        const gameList = res.data
        setBookmarkedGame(gameList)
      })
      .catch((err) => {
        const error = err.response
        if (error.status === 404) {
          console.log("기록이 없습니다.")
        } else {
          console.log("에러가 발생했습니다.")
          setMsg("로드중 에러가 발생했습니다.")
        }
      })
  }, [])
  return (
    <>
      {bookmarkedGame.length === 0 ?
        <div>{msg}</div>
        :
        <>
          { bookmarkedGame.map((game) => <ResultItem key={game.id} game={game} />)}
        </>
      }
    </>
  )

};

export default BookmarkContainer;
