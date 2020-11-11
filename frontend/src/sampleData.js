// API 연결 대신 필요한 샘플 데이터를 생성하는 코드들
// 1. getGames
// - 총 n개의 게임 소스 데이터가 있음을 리턴해주는 코드
const getGames = (n) => ({
  numberOfGames: n,
  firstPageOfGames: Array(n > 10 ? 10 : n)
    .fill(0)
    .map((a, idx) => ({
      id: idx + 1,
      title: `1페이지 ${idx + 1}번째 게임 소스`,
      tags: [{ content: '태그1' }, { content: '태그2' }, { content: '태그3' }],
      subscribers: [],
    })),
});
// 2.getGamesForPage
// - 1. getGames의 n개의 게임 소스 데이터를, 페이지마다 리로드
const getGamesForPage = (numberOfPage, maxPage, numOfGames) =>
  Array(numberOfPage !== maxPage ? 10 :numOfGames - (maxPage-1) * 10)
    .fill(0)
    .map((a, idx) => ({
      id: idx + 1,
      title: `${numberOfPage}페이지 ${idx + 1}번째 게임 소스`,
      tags: [{ content: '태그1' }, { content: '태그2' }, { content: '태그3' }],
      subscribers: [],
    }));

// 3. getRecord
// - 프로필/기록 탭의 데이터 생성
const getRecords = (n) => 
  Array(n)
    .fill(0)
    .map((a, idx) => ({
      // Record 하나의 오브젝트
      id: idx+1, // Record의 Id
      gameId: idx+1, // 기록에 해당하는 게임 소스의 Id
      title: `${idx+1} gameId를 갖는 게임 소스 제목입니다.`,
      time: 33,
      percent: 11,
      grade: 77,
      createAt: "2020.11.10",
      tags: [{ content: '태그1' }, { content: '태그2' }, { content: '태그3' }],
      subscribers: [],
    }));

// 4. getBookmarkedGame
// - 프로필/기록 탭의 데이터 생성
const getBookmarkedGame = (n) => 
Array(n)
  .fill(0)
  .map((a, idx) => ({
    // Record 하나의 오브젝트
    id: idx + 1,
    title: `1페이지 ${idx + 1}번째 게임 소스`,
    tags: [{ content: '태그1' }, { content: '태그2' }, { content: '태그3' }],
    subscribers: idx%3 !== 0 ? [] : [ "sample@naver.com"],
    isBookmarked: idx%3 !== 0 ? false : true,
  }));

// 5. getLoginUser
// - 로그인 성공시 받을 데이터
const getLoginUser = () =>({
  user: {
    username: "jhj",
    email: "jhj@naver.com",
    userid: 3395,
  },
  token: "토오큰"
})

const sampleData = {
  getGames,
  getGamesForPage,
  getRecords,
  getBookmarkedGame,
  getLoginUser,
};
export default sampleData;
