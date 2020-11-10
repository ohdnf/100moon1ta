import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../../components/common/Login';

import { login } from '../../modules/user';
import sampleData from '../../sampleData';

const LoginContainer = ({ changeModal }) => {
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
  
  // temp는 개발용
  const [ temp, setTemp ] = useState({
    user: null,
    token: null,
  })
  // temp는 개발용, 이후 삭제 바람
  
  const onLogin = () => {
    const data = {
      email: email,
      password: password,
    };
    // 목업 코드
    setTemp({
      ...temp,
      user: sampleData.getLoginUser().user,
      token: sampleData.getLoginUser().token,
    })
    // 위는 목업 코드
    // 아래는 찐 코드
    // dispatch(login(data));
  };

  // const githubLogin = () => {
  //   // 소셜 로그인 버튼을 누른다.
  //   // href = "적혀있는주소"로 요청
  //   // 적혀있는 주소로 링크를 연다.
  //   // JWT 반환
  // };

  useEffect(() => {
    if (temp.user) {
      localStorage.setItem('user', JSON.stringify(temp.user));
      localStorage.setItem('token', temp.token);
      alert("로그인 되었습니다.")
      changeModal('');
    }
    // 위는 개발용 목업 코드
    // 아래는 리얼 코드
    if (user && changeModal !== '') {
      // 로그인 성공시
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(token));
      alert("로그인 되었습니다.")
      changeModal('');
    }
  }, [dispatch, changeModal, login, temp, setTemp]);
  return (
    <Login onChange={onChange} changeModal={changeModal} onLogin={onLogin} />
  );
};

export default LoginContainer;
