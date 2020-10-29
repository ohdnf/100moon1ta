import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Button from "./Button";
import Input from "./Input";

const NavbarBlock = styled.div`
  display: flex;
  height: 4rem;
  width: 100%;
  background: DodgerBlue;
  justify-content: space-between;
`;

const NavbarItemBlock = styled.div`
  display: flex;
  height: 4rem;
`;

const NavbarItem = styled.div`
  height: 4rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: DeepSkyBlue;
  margin: 0 0.5rem 0 0.5rem;
  :hover {
    cursor: pointer;
  }
`;

// cursor: auto / default(화살표) / pointer / wait

const Navbar = ({ userName, isLogin, changeIsLogin, changeModal, logout }) => {
  const navItems = [
    { name: "오늘의 타자", toLink: "/#오늘의타자" },
    { name: "소스 목록", toLink: "/games" },
    { name: "커뮤니티", toLink: "/#커뮤니티" },
    { name: "내 페이지", toLink: "/#내페이지" },
  ];
  const history = useHistory();
  return (
    <>
      <NavbarBlock>
        <div>
          <NavbarItemBlock>
            {navItems.map((item) => (
              <NavbarItem
                key={item.name}
                onClick={() => history.push(item.toLink)}
              >
                {item.name}
              </NavbarItem>
            ))}
          </NavbarItemBlock>
        </div>
        <div>
          <NavbarItemBlock>
            {isLogin && <NavbarItem>{userName}</NavbarItem>}
            {isLogin ? (
              <NavbarItem onClick={logout}>로그아웃</NavbarItem>
            ) : (
              <NavbarItem onClick={() => changeModal("login")}>
                로그인
              </NavbarItem>
            )}
          </NavbarItemBlock>
        </div>
      </NavbarBlock>
    </>
  );
};

export default Navbar;
