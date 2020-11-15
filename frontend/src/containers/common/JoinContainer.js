import React, { useEffect, useState } from 'react';
import Join from '../../components/common/Join';
import { signup, checkNickname } from '../../lib/api/user';

const JoinContainer = ({ changeModal }) => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [validation, setValidation] = useState({
    nickname: false,
  });
  const [submitEnable, setSubmitEnable] = useState(false);

  const onChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else {
      if (e.target.name === 'nickname') {
        setNickname(e.target.value);
        setValidation({ nickname: false });
      } else {
        if (e.target.name === 'password') {
          setPassword(e.target.value);
        } else {
          if (e.target.name === 'passwordConfirm') {
            setPasswordConfirm(e.target.value);
          }
        }
      }
    }
  };
  const onCheckNickname = () => {
    if (nickname === "") {
      alert('닉네임을 입력하세요.')
      return
    }
    checkNickname(nickname)
      .then((res) => {
        if (res.data.possible) {
          setValidation({ nickname: true });
          alert('사용 가능한 닉네임입니다.');
        } else {
          alert('사용 불가능한 닉네임입니다.');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('에러가 발생했습니다.');
      });
  };
  const onJoin = () => {
    if (password !== passwordConfirm) {
      alert('두 개의 비밀번호가 일치하지 않습니다.');
      return;
    }
    if (password.length < 8) {
      alert('비밀번호는 8자리 이상이여야 합니다.');
      return;
    }
    const data = {
      username: nickname,
      email: email,
      password1: password,
      password2: passwordConfirm,
    };
    signup(data)
      .then((res) => {
        alert(res.data.detail);
        changeModal('');
      })
      .catch((err) => {
        console.log(err.response.data)
        let alertMessage = ""

        const entries = Object.entries(err.response.data)
        console.log(entries)
        entries.forEach(kv => {
          kv[1].forEach(msg => {
            alertMessage += String(`${kv[0]}: ${msg}\n`)
          })
        });
        alert(alertMessage || '회원 가입 시도가 실패하였습니다.');
      });
  };

  useEffect(() => {
    if (
      email.length &&
      password.length &&
      passwordConfirm.length &&
      validation.nickname
    ) {
      setSubmitEnable(true);
    } else {
      setSubmitEnable(false);
    }
  }, [email, validation, password, passwordConfirm]);
  return (
    <Join
      onChange={onChange}
      changeModal={changeModal}
      onJoin={onJoin}
      onCheckNickname={onCheckNickname}
      submitEnable={submitEnable}
      nicknameValidation={validation.nickname}
    />
  );
};

export default JoinContainer;
