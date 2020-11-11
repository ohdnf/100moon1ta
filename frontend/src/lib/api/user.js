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
  });
  
// JWT 헤더
// const token = localStorage.getItem('token') // 없으면 null
// if (token) {
//   console.log("token헤더에 설정합니다", token)
//   client.defaults.headers.common['Authorization'] = 'JWT ' + token;
//   client.defaults.timeout = 2500;
// }


export const getBookmarkedGames = () =>
  client({
    method: 'get',
    url: `/accounts/bookmark/`,
  })