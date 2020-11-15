import React, { useState } from "react";
import { useDispatch } from 'react-redux';

import Navbar from "../../components/common/Navbar";
import LoginContainer from "./LoginContainer";
import JoinContainer from "./JoinContainer";

import { logout } from '../../modules/user';
import client from "../../lib/api/client";
import { useHistory } from "react-router-dom";

const NavbarContainer = () => {
  const [modal, setModal] = useState("");

  const changeModal = (target) => {
    setModal(target);
  };
  const dispatch = useDispatch();
  const history = useHistory()

  const onLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete client.defaults.headers.common["Authorization"];
    alert("로그아웃 되었습니다.")
    dispatch(logout());
    changeModal('') //이 코드는 혹시 몰라 modal 닫기위해 추가
    history.push('/')
  };

  return (
    <>
      <Navbar
        changeModal={changeModal}
        onLogout={onLogout}
      />
      {modal === "login" ? (
        <LoginContainer
          changeModal={changeModal}
        />
      ) : (
        modal === "join" && (
          <JoinContainer
            changeModal={changeModal}
          />
        )
      )}
    </>
  );
};

export default NavbarContainer;
