import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';

const NavbarBlock = styled.div`
  display: flex;
  height: 4rem;
  width: 100%;
  background: yellow;
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
  background: brown;
  margin: 0 0.5rem 0 0.5rem;
  :hover {
    cursor: pointer;
  }
`;
// cursor: auto / default(화살표) / pointer / wait

const Navbar = ({ menuClicked, onBtnClick, onNewClick }) => {
  const navItems = [
    { name: '오늘의 타자', toLink: '/#오늘의타자'},
    { name: '소스 목록', toLink: '/#소스목록'},
    { name: '커뮤니티', toLink: '/#커뮤니티'},
    { name: '내 페이지', toLink: '/#내페이지'},
  ]
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();
  return (
    <>
      <NavbarBlock>
        <div>
          <NavbarItemBlock>
            { navItems.map((item) => (
              <NavbarItem onClick={() => history.push(item.toLink)} >{item.name}</NavbarItem>
            ))}
          </NavbarItemBlock>
        </div>
        <div>
          <NavbarItemBlock>
            { isLogin &&
              <NavbarItem>로그인유저</NavbarItem>
            }
            { isLogin ? 
              <NavbarItem onClick={() => setIsLogin(false)}>로그아웃</NavbarItem>
              :
              <NavbarItem onClick={() => setIsLogin(true)}>로그인</NavbarItem>
            }
          </NavbarItemBlock>
        </div>
      </NavbarBlock>
    </>
  );
};

export default Navbar;
