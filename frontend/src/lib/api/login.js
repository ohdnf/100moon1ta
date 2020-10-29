import client from './client';

export const login = (data) =>
  client({
    method: 'post',
    url: `api/v1/login/`,
    data: data,
    /*
        data: {
            email: 스트링,
            password: 스트링?,
        }
    */
  });

  export const gets = (params) =>
  client({
    method: 'get',
    params: params
  });