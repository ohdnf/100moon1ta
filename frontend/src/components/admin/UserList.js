import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getUserList } from '../../lib/api/admin';
import CheckBox from '../../components/admin/CheckBox';

const Users = styled.div`
  margin: 1rem 5rem;
  font-size; larger;
  h1 {
    cursor: default;
  }
`

const UserList = () => {
  const [ userList, setUserList] = useState([]);

  useEffect(() => {
    getUserList()
      .then((response) => {
        // 성공시 => 뭐가 성공인지는 확인 필요
        if (typeof response.data === 'object') {
          setUserList(response.data);
        } else {
          console.log('타입이 object가 아닙니다!', typeof response.data);
        }
      })
      .catch((error) => {
        // 에러를 출력해주는 3가지 방식 => 각각 작동하는 환경이 다름
        console.error(error.response);
        console.error(error.request);
        console.error(error.message);
      });
  }, []);

  return (
    <Users>
      <ol>
        <h1>유저 목록 (인증 / 관리자 / 블랙)</h1>
        {userList.map((e, index) => (
          <li key={index}>
            {e.email} : {e.username}
            <CheckBox uid={e.id} verified={e.verified} isStaff={e.is_staff} isBan={e.is_ban}/>
          </li>
        ))}
      </ol>
    </Users>
  );
};

export default UserList;
