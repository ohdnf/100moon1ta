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
// - 1 getGames의 n개의 게임 소스 데이터를, 페이지마다 리로드
const getGamesForPage = (numberOfPage, maxPage, numOfGames) =>
  Array(numberOfPage !== maxPage ? 10 :numOfGames - (maxPage-1) * 10)
    .fill(0)
    .map((a, idx) => ({
      id: idx + 1,
      title: `${numberOfPage}페이지 ${idx + 1}번째 게임 소스`,
      tags: [{ content: '태그1' }, { content: '태그2' }, { content: '태그3' }],
      subscribers: [],
    }));

const sampleData = {
  getGames,
  getGamesForPage,
};
export default sampleData;
