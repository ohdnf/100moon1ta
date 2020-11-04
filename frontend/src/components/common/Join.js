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

const Join = ({
  onChange,
  changeModal,
  onJoin,
  onCheckNickname,
  submitEnable,
  nicknameValidation,
}) => {
  return (
    <>
      <SelectMeModal>
        <div className="modalLabel">회원가입창</div>
        <Input name="email" onChange={onChange} fullWidth/><br />
        <Input name="nickname" onChange={onChange} /> <Button onClick={onCheckNickname} disabled={nicknameValidation}>중복체크</Button><br />
        <Input name="password" onChange={onChange} fullWidth/><br />
        <Input name="passwordConfirm" onChange={onChange} fullWidth/>

        <Button onClick={onJoin} disabled={!submitEnable}>회원가입</Button><br />
        <Button onClick={() => changeModal("login")}>로그인으로</Button>
        <Button onClick={() => changeModal("")}>닫기</Button>
      </SelectMeModal>
    </>
  );
};

export default Join;