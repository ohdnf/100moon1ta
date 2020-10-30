import client from './client';

export const getTodaySource = () =>
  client({
    method: 'get',
    url: `/api/v1/games/1`,
  });