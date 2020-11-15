import client from './client';

export const getUserList = () =>
  client({
    method: 'get',
    url: `/accounts/mng/`,
  });

export const changeChecked = (action, uid) =>
  client({
    method: 'patch',
    url: `/accounts/mng/${action}/${uid}/`
  })
