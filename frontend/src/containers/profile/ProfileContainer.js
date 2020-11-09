// 구조계획
// 1. 내 페이지
// 2. 내 정보
// 이메일, 닉네임
// 종합기록
// 3. 탭으로 구분 되는 3개의 항목
// 3-1. 기록 => RecordContainer.js
// 3-2. 북마크한 소스 => SourceContainer.js
// 3-3. 작성글 => PostsContainer.js

import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import Profile from '../../components/profile/Profile';
import ProfileRecord from '../../components/profile/ProfileRecord';
import Record from '../../components/profile/Record';
import Source from '../../components/profile/Source';
import Post from '../../components/profile/Post';

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
  return (
    <>
      <MainBlock>
        <InfoBlock>
          <Block backColor="Yellow">
            <Profile />
          </Block>
          <Block backColor="Blue">
            <ProfileRecord />
          </Block>
        </InfoBlock>
        <Block backColor="Pink">
          <FlexBox>
            <StyledDiv onClick={() => setTab('record')}>기록</StyledDiv>
            <StyledDiv onClick={() => setTab('source')}>북마크한소스</StyledDiv>
            <StyledDiv onClick={() => setTab('post')}>작성글</StyledDiv>
          </FlexBox>
          {tab === 'record' ? (
            <Record />
          ) : tab === 'source' ? (
            <Source />
          ) : (
            <Post />
          )}
        </Block>
      </MainBlock>
    </>
  );
};

export default ProfileContainer;
