import React, { useState } from "react";
import { useDispatch } from 'react-redux';

import Navbar from "../../components/common/Navbar";
import LoginContainer from "./LoginContainer";
import JoinContainer from "./JoinContainer";

import { logout } from '../../modules/user';

const NavbarContainer = () => {
  const [modal, setModal] = useState("");
  // const { user, error } = useSelector(({ user }) => ({
  //   user: user.user,
  //   error: user.error,
  // }));
  // const [nextUrl, setNextUrl] = useState("");

  const changeModal = (target) => {
    setModal(target);
  };
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
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
