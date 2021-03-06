import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import Profile from '../../components/profile/Profile';
import ProfileRecord from '../../components/profile/ProfileRecord';
import RecordContainer from './RecordContainer';
import BookmarkContainer from './BookmarkContainer';
import Post from '../../components/profile/Post';

import { getMy } from '../../lib/api/user';

const MainBlock = styled.div`
  width: 67%;
  margin: 2rem auto;
`;

const InfoBlock = styled.div`

  display: flex;
  align-items: center;
`;

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
  margin: 1rem 0;
`;

const StyledDiv = styled.div`
	margin-right: 1rem;
  cursor: pointer;
  ${(props) => props.bold && 'font-weight: bold'}
`

const ProfileContainer = () => {
  const [tab, setTab] = useState('record');
  const [userProfile, setUserProfile] = useState(null)
  const emptyProfile = {
    id: 0,
    email: "",
    username: "",
    profile_image: "",
    comment: "",
    record: 0,
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
    })
    .catch((err) => {
      console.error(err)
    })
  }, [])
  return (
    <>
      <MainBlock>
        <Profile userProfile={userProfile === null ? emptyProfile : userProfile}/>
        <Block>
          <FlexBox>
            <StyledDiv bold={tab==="record"} onClick={() => setTab('record')}>기록</StyledDiv>
            <StyledDiv bold={tab==="source"} onClick={() => setTab('source')}>북마크한소스</StyledDiv>
          </FlexBox>
          {tab === 'record' ? (
            <RecordContainer />
          ) : (
            <BookmarkContainer />
          ) }
        </Block>
      </MainBlock>
    </>
  );
};

export default ProfileContainer;
