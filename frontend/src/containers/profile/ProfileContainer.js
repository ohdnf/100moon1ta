// 구조계획
// 1. 내 페이지
// 2. 내 정보
// 이메일, 닉네임
// 종합기록
// 3. 탭으로 구분 되는 3개의 항목
// 3-1. 기록 => RecordContainer.js
// 3-2. 북마크한 소스 => SourceContainer.js
// 3-3. 작성글 => PostsContainer.js

import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import Profile from '../../components/profile/Profile';
import ProfileRecord from '../../components/profile/ProfileRecord';
import RecordContainer from './RecordContainer';
import BookmarkContainer from './BookmarkContainer';
import Post from '../../components/profile/Post';

import sampleData from '../../sampleData'
import { getMy } from '../../lib/api/user';

// grid-template-columns : 좌우로 프레임 분할
// grid-template-rows : 상하로 프레임 분할
const MainBlock = styled.div`
  width: 100%;
  background: Gray;
`;

const InfoBlock = styled.div`
  background: LightGreen;
  display: flex;
  align-items: center;
`;
// const ListBlock = styled.div`
//   background: LightBlue;
// `;

const Block = styled.div`
  width: 100%;
  ${(props) =>
    props.backColor &&
    css`
      background: ${props.backColor};
    `}
`;
const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;

const StyledDiv = styled.div`
	margin: 0 0.25rem;
	background: white;
	cursor: pointer;
`

const ProfileContainer = () => {
  // 유저 정보 => redux
  const [tab, setTab] = useState('record');
//   {
//     "id": 52,
//     "email": "jhj9109@naver.com",
//     "username": "jhj9109",
//     "profile_image": "http://localhost:8000/media/2",
//     "comment": "",
//     "record": 0
// }
  const [userProfile, setUserProfile] = useState(null)
  const [userRecord, setUserRecord] = useState(null)
  const emptyProfile = {
    id: 0,
    email: "",
    username: "",
    profile_image: "",
    comment: "",
    record: 0,
  }
  const emptyRecord = {
    grade: 0,
    time: 0,
    accuracy: 0,
  }
  useEffect(()=> {
    getMy()
    .then((res) => {
      const userData = res.data
      if (userProfile === null) {
        setUserProfile(userData)
      } else {
        setUserProfile({
          ...userProfile,
          userData
        })
      }
      /* 
        이 부분엔 userRecord를 바꾸는 코드가 있어야 할듯
      */
    })
  }, [])
  return (
    <>
      <MainBlock>
        <InfoBlock>
          <Block backColor="Yellow">
            <Profile userProfile={userProfile === null ? emptyProfile : userProfile}/>
          </Block>
          <Block backColor="Blue">
            <ProfileRecord userRecord={userRecord === null ? emptyRecord : userRecord}/>
          </Block>
        </InfoBlock>
        <Block backColor="Pink">
          <FlexBox>
            <StyledDiv onClick={() => setTab('record')}>기록</StyledDiv>
            <StyledDiv onClick={() => setTab('source')}>북마크한소스</StyledDiv>
            <StyledDiv onClick={() => setTab('post')}>작성글</StyledDiv>
          </FlexBox>
          {tab === 'record' ? (
            // <Record records={records}/>
            <RecordContainer />
          ) : tab === 'source' ? (
            <BookmarkContainer />
          ) : (
            <Post />
          )}
        </Block>
      </MainBlock>
    </>
  );
};

export default ProfileContainer;
