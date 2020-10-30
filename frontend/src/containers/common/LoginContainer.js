import React, { useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Login from '../../components/common/Login';

import { login } from '../../modules/user';

const LoginContainer = ({ changeUserName, changeIsLogin, changeModal }) => {
  const { user, error } = useSelector(({ user }) => ({
    user: user.user,
    error: user.error,
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
    console.log("첫번째 디스패치!", data)
    if (user !== null) {
      console.log("성공", user)
      // 성공시
      changeModal('');
      changeUserName(email);
      changeIsLogin(true);
    } else {
      // 실패시 ?
      console.log("실패", user)
      console.error(error)
      document.getElementById("password").focus();
    }
  };
  const githubLogin = () => {
    // 소셜 로그인 버튼을 누른다.
    // href = "적혀있는주소"로 요청
    // 적혀있는 주소로 링크를 연다.
    // JWT 반환
  };

  return (
    <Login onChange={onChange} changeModal={changeModal} onLogin={onLogin} />
  );
};

export default LoginContainer;
