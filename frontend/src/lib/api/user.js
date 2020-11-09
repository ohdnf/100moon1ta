import client from './client';

export const signup = (data) =>
  client({
    method: 'post',
    url: `/accounts/signup/`,
    data: data
  });

export const login = (data) =>
  client({
    method: 'post',
    url: `/accounts/login/`,
    data: data
  });

export const logout = () =>
  client({
    method: 'get',
    url: `/accounts/logout/`,
  });

export const checkNickname = (nickname) =>
  client({
    method: 'get',
    url: `/accounts/nickname-duplicated/${nickname}/`,
  });