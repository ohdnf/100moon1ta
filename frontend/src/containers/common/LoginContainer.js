import Axios from "axios";
import React, { useState } from "react";

import Login from "../../components/common/Login";

const LoginContainer = ({
  changeUserName,
  changeIsLogin,
  changeModal,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [nextUrl, setNextUrl] = useStae("");

  const onChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      if (e.target.name === "password") {
        setPassword(e.target.value);
      }
    }
  };

  const onLogin = () => {
    // 성공시
    changeModal("");
    changeUserName(email);
    changeIsLogin(true);


    //실패시
  };
  const githubLogin = () => {
    // 소셜 로그인 버튼을 누른다.
    // href = "적혀있는주소"로 요청
    
    // 적혀있는 주소로 링크를 연다.
    
    // JWT 반환
  }

  return (
    <Login
      onChange={onChange}
      changeModal={changeModal}
      onLogin={onLogin}
    />
  );
};

export default LoginContainer;
