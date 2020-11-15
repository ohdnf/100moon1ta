import React, { useState } from "react";
import { useDispatch } from 'react-redux';

import Navbar from "../../components/common/Navbar";
import LoginContainer from "./LoginContainer";
import JoinContainer from "./JoinContainer";

import { logout } from '../../modules/user';
import client from "../../lib/api/client";

const NavbarContainer = () => {
  const [modal, setModal] = useState("");

  const changeModal = (target) => {
    setModal(target);
  };
  const dispatch = useDispatch();

  const onLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete client.defaults.headers.common["Authorization"];
    alert("로그아웃 되었습니다.")
    dispatch(logout());
    changeModal('')
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
