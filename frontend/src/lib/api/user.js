import client from './client';

// accounts에 해당하는 API콜

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
    method: 'post',
    url: `/accounts/logout/`,
  });

export const checkNickname = (nickname) =>
  client({
    method: 'get',
    url: `/accounts/nickname-duplicated/${nickname}/`,
  });

export const bookmarkGame = (data) =>
  client({
    method: 'post',
    url: `/accounts/bookmark/`,
    data: data,
    //{ source_id: source_id}
  });
  
export const getBookmarkedGames = () =>
  client({
    method: 'post',
    url: `/accounts/bookmark/`,
  })