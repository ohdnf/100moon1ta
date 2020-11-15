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

export const saveRecord = (data, sid) =>
  client({
    method: 'post',
    url: `/games/${sid}/history/`,
    data: data
  });

export const getGame = (id) =>
  client({
    method: 'get',
    url: `/games/${id}/`,
  });
