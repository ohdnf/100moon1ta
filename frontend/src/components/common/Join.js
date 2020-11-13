import React from 'react';
import styled from 'styled-components';

import Button from './Button';
import Input from './Input';

const modalSize = '15rem';
const SelectMeModal = styled.div`
  background: white;
  position: fixed;
  top: 30%;
  left: calc(50% - ${modalSize} / 2);
  padding: 2rem;
  padding-bottom: 1rem;
  width: ${modalSize};
  border-radius: 20px;
  border: ridge;
  div.modalLabel {
    font-size: 1.5rem;
    color: 241654;
    text-align: center;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

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
        <div className="modalLabel">회원가입</div>
        <Input name="email" onChange={onChange} fullWidth />
        <br />
        <Input name="nickname" onChange={onChange} />{' '}
        <Button onClick={onCheckNickname} disabled={nicknameValidation} small>
          중복체크
        </Button>
        <br />
        <Input
          name="password"
          placeholderString={'password1'}
          onChange={onChange}
          fullWidth
        />
        <br />
        <Input
          name="passwordConfirm"
          placeholderString={'password2'}
          onChange={onChange}
          fullWidth
        />
        <Button onClick={onJoin} disabled={!submitEnable} fullWidth>
          회원가입
        </Button>
        <br />
        <FlexDiv>
          <Button onClick={() => changeModal('login')}>로그인으로</Button>
          <Button onClick={() => changeModal('')}>닫기</Button>
        </FlexDiv>
      </SelectMeModal>
    </>
  );
};

export default Join;
