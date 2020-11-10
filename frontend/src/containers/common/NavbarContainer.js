import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import Navbar from "../../components/common/Navbar";
import LoginContainer from "./LoginContainer";
import JoinContainer from "./JoinContainer";

import { logout } from '../../modules/user';

const NavbarContainer = () => {
  const [modal, setModal] = useState("");
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  // const [nextUrl, setNextUrl] = useState("");

  const changeModal = (target) => {
    setModal(target);
  };
  const dispatch = useDispatch();

  const onLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    alert("로그아웃 되었습니다.")
    dispatch(logout());    
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
