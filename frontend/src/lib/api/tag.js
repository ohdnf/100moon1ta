import client from './client';

export const getTags = () =>
  client({
    method: 'get',
    url: `/tags/`,
  });