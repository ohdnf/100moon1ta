import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import Join from '../../components/common/Join';
// import { useHistory } from "react-router-dom";

// import { signup } from '../../modules/user';
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
  // const dispatch = useDispatch();
  // const history = useHistory();
  //   const [nextUrl, setNextUrl] = useStae("");

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
    // 입력이 없을때 핸들링 추가
    if (nickname === "") {
      alert('닉네임을 입력하세요.')
      return
    }
    checkNickname(nickname)
      .then((res) => {
        //res.data.possible = true or false
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
        //status:201, data.detail:"확인 이메일을 발송했습니다."
        alert(res.data.detail);
        changeModal('');
      })
      .catch((err) => {
        // 1. 비밀번호가 모두 숫자 => {"password1":["비밀번호가 전부 숫자로 되어 있습니다."]}
        // console.log(err.response)
        console.log(err.response.data)
        let alertMessage = ""
        // key: [ values ]

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
    // email, nickname(의 validation), password, passwordConfirm이 정상이면 버튼 오픈
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
