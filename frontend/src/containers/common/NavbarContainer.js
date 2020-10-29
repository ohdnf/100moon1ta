import React, { useState } from "react";

import Navbar from "../../components/common/Navbar";
import LoginContainer from "./LoginContainer";
import JoinContainer from "./JoinContainer";

const NavbarContainer = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [modal, setModal] = useState("");
  const [userName, setUserName] = useState("");
  // const [nextUrl, setNextUrl] = useState("");

  const changeIsLogin = (booleanValue) => {
    setIsLogin(booleanValue);
  };
  const changeModal = (target) => {
    setModal(target);
  };
  const changeUserName = (name) => {
    setUserName(name);
  };

  const logout = () => {
    setUserName("");
    setIsLogin(false);
  };

  return (
    <>
      <Navbar
        userName={userName}
        isLogin={isLogin}
        changeIsLogin={changeIsLogin}
        changeModal={changeModal}
        logout={logout}
      />
      {modal === "login" ? (
        <LoginContainer
          changeModal={changeModal}
          changeUserName={changeUserName}
          changeIsLogin={changeIsLogin}
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
