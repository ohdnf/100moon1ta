import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';


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

const Navbar = ({ changeModal, onLogout }) => {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  const isLogin = user === null ? false : true;
  const userName = user === null ? '' : user.username;
  const navItems = [
    { name: '연습할 글', toLink: '/games' },
    { name: '순위', toLink: '/rank' },
    { name: '관리자', toLink: '/admin' },
  ];
  const history = useHistory();
  const [nowActive, setNowActive] = useState(window.location.pathname);
  return (
    <>
      <NavbarBlock>
        <div>
          <NavbarItemBlock>
            <ImgDiv
              src={require('../../images/logo.svg')}
              height="4rem"
              alt="logo"
              onClick={() => {
                setNowActive('/');
                history.push('/');
              }}
            />
            {navItems.map((item, index) => (
              <React.Fragment key={index}>
                {nowActive === item.toLink ? (
                  <NavbarItem
                    key={item.name}
                    onClick={() => { setNowActive(item.toLink); history.push(item.toLink); }}
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
              </React.Fragment>
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
