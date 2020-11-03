import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import Join from "../../components/common/Join";
// import { useHistory } from "react-router-dom";

// import { signup } from '../../modules/user';
import { signup, checkNickname } from '../../lib/api/user'

const JoinContainer = ({
  changeModal,
}) => {
  const [email, setEmail] = useState("a1@naver.com");
  const [nickname, setNickname] = useState("a1");
  const [password, setPassword] = useState("123");
  const [passwordConfirm, setPasswordConfirm] = useState("123");
  const [validation, setValidation] = useState({
    nickname: false,
  })
  const [submitEnable, setSubmitEnable] = useState(false)
  const dispatch = useDispatch();
  // const history = useHistory();
  //   const [nextUrl, setNextUrl] = useStae("");
  
  const onChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      if (e.target.name === "nickname") {
        setNickname(e.target.value);
        setValidation({ nickname: false })
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
  const onCheckNickname = () => {
    checkNickname(nickname)
    .then( (response) => {
      console.log(response)
      const data = response.data
      if (data.possible) {
        // possible : true 라면
        setValidation({ nickname: true })
        alert("사용 가능한 닉네임입니다.")
      } else {
        // possible : false
        alert("사용 불가능한 닉네임입니다.")
      }
    })
    .catch( (err) => {
      console.error(err)
      alert("에러가 발생했습니다.")
    })
  }
  const onJoin = () => {
    if (password !== passwordConfirm) {
      alert("두 개의 비밀번호가 일치하지 않습니다.")
      return
    }
    if (password.length < 8) {
      alert("비밀번호는 8자리 이상이여야 합니다.")
      return
    }
    const data = {
      username: nickname,
      email: email,
      password1: password,
      password2: passwordConfirm,
    }
    signup(data)
    .then((response)=>{
      //status:201, data.detail:"확인 이메일을 발송했습니다."
      console.log(response)
    })
    .catch((error) =>{
      // axios
      // 1. error.response : 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            //data, status, headers
      // 2. error.request
        // 요청이 우리어졌으나 응답을 받지 못했습니다.
        // error.request 는 브라우저의 XMLHttpRequest 인스턴스 or
        // Node.js의 http.ClientRequest 인스턴스 입니다.
      // 3. error.message
        // 오류를 발생시킨 요청을 설정하는 중 문제가 발생
      // 기타. error.config
      
      // status:400, data:[] => 원인이 되는 column키:string : msg:string
      // non_field_errors : "두 개의 패스워드 필드가 서로 맞지 않습니다."
      // password1 or password2
        // 비밀번호가 너무 일상적인 단어입니다.
        // 비밀번호가 너무 짧습니다. 최소 8 문자를 포함해야 합니다.
        // 비밀번호가 전부 숫자로 되어 있습니다.
      // if (error.response.status === 400) {
      //   // 닉네임 사전 벨리베이션 => email or password에 문제
      //   console.log (error.response)
      //   console.log (error.response.data)
      //   console.log (typeof error.response.data)
      //   let message = ""
      //   Array.prototype.forEach.call(error.response.data,
      //     (key) => {

      //       console.log("맵")
      //       key.forEach((msg) => {
      //         console.log(msg)
      //         message = message + msg
      //       });
      //   })
        alert("올바르지 않은 입력값입니다.")
      // }
    })
    alert("로그인 하러 가면 될듯?!")
    // changeModal("login")
  };
  
  useEffect(() => {
    // email, nickname(의 validation), password, passwordConfirm이 정상이면 버튼 오픈
    if (email.length && password.length && passwordConfirm.length && validation.nickname) {
      setSubmitEnable(true)
    } else {
      setSubmitEnable(false)
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
