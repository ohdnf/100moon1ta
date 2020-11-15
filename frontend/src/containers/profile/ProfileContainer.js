import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import Profile from '../../components/profile/Profile';
import ProfileRecord from '../../components/profile/ProfileRecord';
import RecordContainer from './RecordContainer';
import BookmarkContainer from './BookmarkContainer';
import Post from '../../components/profile/Post';

import { getMy } from '../../lib/api/user';

const MainBlock = styled.div`
  width: 100%;
  background: Gray;
`;

const InfoBlock = styled.div`
  background: LightGreen;
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
`;

const StyledDiv = styled.div`
	margin: 0 0.25rem;
	background: white;
	cursor: pointer;
`

const ProfileContainer = () => {
  const [tab, setTab] = useState('record');
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
  useEffect(() => {
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
  }, [])
  return (
    <>
      <MainBlock>
        <InfoBlock>
          <Block backColor="Yellow">
            <Profile userProfile={userProfile === null ? emptyProfile : userProfile} />
          </Block>
          <Block backColor="Blue">
            <ProfileRecord userRecord={userRecord === null ? emptyRecord : userRecord} />
          </Block>
        </InfoBlock>
        <Block backColor="Pink">
          <FlexBox>
            <StyledDiv onClick={() => setTab('record')}>기록</StyledDiv>
            <StyledDiv onClick={() => setTab('source')}>북마크한소스</StyledDiv>
            <StyledDiv onClick={() => setTab('post')}>작성글</StyledDiv>
          </FlexBox>
          {tab === 'record' ? (
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
