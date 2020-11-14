import client from './client';

export const getTodaySource = () =>
  client({
    method: 'get',
    url: `/games/today/`,
  });