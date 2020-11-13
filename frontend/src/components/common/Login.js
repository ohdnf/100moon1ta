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

const Login = ({ onChange, changeModal, onLogin }) => {
  return (
    <>
      <SelectMeModal>
        <div className="modalLabel">로그인</div>
        <Input name="email" onChange={onChange} fullWidth />
        <Input name="password" onChange={onChange} fullWidth />
        <Button onClick={onLogin} fullWidth>
          로그인
        </Button>
        <br />

        <Button onClick={() => console.log('소셜로그인!')} github fullWidth>
          <img src={require('../../images/github.png')}
            height="20rem"
            background="white"
          />
          Github Login
        </Button>
        <FlexDiv>
        <Button onClick={() => changeModal('join')}>
          회원가입으로
        </Button>
          <Button onClick={() => changeModal('')}>
            닫기
          </Button>
        </FlexDiv>
      </SelectMeModal>
    </>
  );
};

export default Login;
