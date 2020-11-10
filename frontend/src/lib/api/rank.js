import client from './client';

export const getRanking = () =>
  client({
    method: 'get',
    url: `/rank/`,
  });
