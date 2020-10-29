import React from "react";
import styled from "styled-components";

import Button from './Button';
import Input from './Input';

const SelectMeModal = styled.div`
  background: DodgerBlue;
  position: fixed;
  top: 30%;
  left: calc(50% - 20rem);
  padding: 2rem;
  padding-bottom: 1rem;
  width: 40rem;
  border-radius: 20px;
  div.modalLabel {
    font-size: 1.5rem;
    color: DeepSkyBlue;
    text-align: center;
  }
`;

const Login = ({
  onChange,
  changeModal,
  onLogin,
}) => {
  return (
    <>
      <SelectMeModal>
        <div className="modalLabel">로그인창</div>
        
        <Input name="email" onChange={onChange} />
        <br />
        <Input name="password" onChange={onChange} />

        <Button onClick={onLogin}>로그인</Button><br />
        <Button onClick={() => changeModal("join")}>회원가입으로</Button>
        <Button onClick={() => console.log("소셜로그인!")}>소셜로그인</Button>
        <Button onClick={() => changeModal("")}>닫기</Button>
      
      </SelectMeModal>
    </>
  );
};

export default Login;