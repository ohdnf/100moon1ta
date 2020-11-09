import client from './client';

export const getGames = () =>
  client({
    method: 'get',
    url: `/games/`,
  });

/* 
  game
  "id": Int,
  "category": Stirng,
  "length": Int,
  "difficulty": Int,
  "likers": [ objects ]
    "id": Int,
    "email": String,
    "username": String,
    "profile_image": null, => 아직 구현아닌듯
    "comment": "", => 뭘까(랭킹의 그 문구인듯)
  "subscribers" : [ objects ]
    위와 동일
*/