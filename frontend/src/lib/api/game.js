import client from './client';

export const getGames = () =>
  client({
    method: 'get',
    url: `/games/`,
  });

export const getAllRecord = (userId) =>
  client({
    method: 'get',
    url: `/games/${userId}/history/`,
  });

export const saveRecord = () =>
  client({
    method: 'post',
    url: `/games/<int:pk>/history/`,
  });

export const getGame = (id) =>
  client({
    method: 'get',
    url: `/games/${id}/`,
  });
/* 
  GET /games/
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
/*
  GET /games/<pk:int>
  {
  "id": Int
  "title": String
  "description": String
  "link": String
  "category": String인가? "T"
  "content": String
  "length": Int
  "difficulty": Int
  "likers": [
    {
      "id": Int
      "email": String 
      "username": String 
      "profile_image": String "/media/2",
      "comment": "",
      "record": Int
    },
    
  ],
  "subscribers": [
    {
      "id": Int,
      "email": String,
      "username": String,
      "profile_image": String "/media/2",
      "comment": "",
      "record": Int
    },
  ],
  "tags": [
    {
      "id": Int,
      "content": String
    },
  ]
}
*/