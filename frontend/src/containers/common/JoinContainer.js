import React, { useState } from "react";

import Join from "../../components/common/Join";

const JoinContainer = ({
  changeModal,
}) => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  //   const [nextUrl, setNextUrl] = useStae("");
  
  const onChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      if (e.target.name === "nickname") {
        setNickname(e.target.value);
      } else {
        if (e.target.name === "password") {
          setPassword(e.target.value);
        } else {
          if (e.target.name === "passwordConfirm") {
            setPasswordConfirm(e.target.value);
          }
        }
      }
    }
    
  };

  const onJoin = () => {
    // 성공시
    // 이메일 보내는 페이지?
    // 이후 로그인 모달로 이동
    changeModal("login")

    //실패시
  };

  return (
    <Join
      onChange={onChange}
      changeModal={changeModal}
      onJoin={onJoin}
    />
  );
};

export default JoinContainer;
