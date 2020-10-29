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

  return (
    <Login
      onChange={onChange}
      changeModal={changeModal}
      onLogin={onLogin}
    />
  );
};

export default LoginContainer;
