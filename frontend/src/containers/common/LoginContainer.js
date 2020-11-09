import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../../components/common/Login';

import { login } from '../../modules/user';

const LoginContainer = ({
  changeModal }) => {
  const { user, token } = useSelector(({ user }) => ({
    user: user.user,
    token: user.token,
  }));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  //   const [nextUrl, setNextUrl] = useStae("");

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
      password: password
    }
    dispatch(login(data));
  };
  const githubLogin = () => {
    // 소셜 로그인 버튼을 누른다.
    // href = "적혀있는주소"로 요청
    // 적혀있는 주소로 링크를 연다.
    // JWT 반환
  };

  useEffect(() => {
    if (user && changeModal !== "") {
      // 로그인 성공시
      changeModal("")
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(token));
    }
  }, [dispatch, changeModal, login]);
  return (
    <Login onChange={onChange} changeModal={changeModal} onLogin={onLogin} />
  );
};

export default LoginContainer;
