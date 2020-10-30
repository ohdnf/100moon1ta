import client from './client';

export const signup = (data) =>
  client({
    method: 'post',
    url: `/api/v1/accounts/signup/`,
    data: data
  });

  export const login = (data) =>
  client({
    method: 'post',
    url: `/api/v1/accounts/login/`,
    data: data
  });