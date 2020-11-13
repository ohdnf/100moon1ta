import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import Button from "./Button";
// import Input from "./Input";

const NavbarBlock = styled.div`
  display: flex;
  height: 4rem;
  width: 100%;
  justify-content: space-between;
  border-bottom-style: solid;
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
  margin: 0 0.5rem 0 0.5rem;
  opacity: 1;
  ${(props) =>
    props.now &&
    css`
      background: blue;
    `}
  :hover {
    cursor: pointer;
  }
`;
const ImgDiv = styled.img`
  display: block;
  padding: 0.25rem;
  height: 3.5rem;
  :hover {
    cursor: pointer;
  }
`

// cursor: auto / default(화살표) / pointer / wait

const Navbar = ({ changeModal, onLogout }) => {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  const isLogin = user === null ? false : true;
  const userName = user === null ? '' : user.username;
  const navItems = [
    { name: '오늘의 타자', toLink: '/today' },
    { name: '소스 목록', toLink: '/games' },
    { name: '커뮤니티', toLink: '/community' },
    { name: '랭킹', toLink: '/rank' },
    { name: 'ADMIN', toLink: '/admin' },
  ];
  const history = useHistory();
  const [nowActive, setNowActive] = useState(window.location.pathname);
  useEffect(() => {
    // setNowActive(window.location.pathname);
    console.log("바꿔!", window.location.pathname)
  }, []);
  
  return (
    <>
      <NavbarBlock>
        <div>
          <NavbarItemBlock>
            <ImgDiv
              src={require('../../images/logo.jpg')}
              height="4rem"
              alt="logo2"
              onClick={()=>{
                setNowActive('/');
                history.push('/');
              }}
            />
            {navItems.map((item) => (
              <>
                {nowActive === item.toLink ? (
                  <NavbarItem
                    // now 기능에 제대로 구현 되기 전까지 보류
                    key={item.name}
                    onClick={() => {setNowActive(item.toLink); history.push(item.toLink);}}
                  >
                    {item.name}
                  </NavbarItem>
                ) : (
                  <NavbarItem
                    key={item.name}
                    onClick={() => history.push(item.toLink)}
                  >
                    {item.name}
                  </NavbarItem>
                )}
              </>
            ))}
          </NavbarItemBlock>
        </div>
        <div>
          <NavbarItemBlock>
            {isLogin && <NavbarItem onClick={() => history.push('/profile')}>{userName}</NavbarItem>}
            {isLogin ? (
              <NavbarItem onClick={onLogout}>로그아웃</NavbarItem>
            ) : (
              <NavbarItem onClick={() => changeModal('login')}>
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
