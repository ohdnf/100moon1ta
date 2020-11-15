import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../../components/common/Login';
import client from '../../lib/api/client';

import { login } from '../../modules/user';
import { errorDelete } from '../../modules/user';

const LoginContainer = ({ changeModal }) => {
  const { user, token, error } = useSelector(({ user }) => ({
    user: user.user,
    error: user.error,
    token: user.token,
  }));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else {
      if (e.target.name === 'password') {
        setPassword(e.target.value);
      }
    }
  };

  const onLogin = () => {
    const data = {
      email: email,
      password: password,
    };
    dispatch(login(data));
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      client.defaults.headers.common['Authorization'] = 'JWT ' + token;
      alert("로그인 되었습니다.")
      changeModal('');
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      if (error.message.indexOf('400') === -1) {
        alert(error.message + '\n' + '로그인 요청에 실패했습니다.')
      } else {
        alert(error.message + '\n' + '이메일 혹은 비밀번호가 잘못되었습니다.')
      }
    }
    dispatch(errorDelete())
  }, [error])
  return (
    <Login onChange={onChange} changeModal={changeModal} onLogin={onLogin} />
  );
};

export default LoginContainer;
