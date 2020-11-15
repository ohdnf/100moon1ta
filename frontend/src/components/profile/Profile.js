import React from 'react';
import styled from 'styled-components';
import PageTitle from '../common/PageTitle';

const ProfileBlock = styled.div`
  background: Azure;
  border: 0.25rem solid BlueViolet;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;

const ImgDiv = styled.img`
  display: block;
  width: ${100 / 16}rem;
  height: ${100 / 16}rem;
`;
const Profile = ({ userProfile }) => {
  const { email, nickname, profile_image } = userProfile;
  return (
    <ProfileBlock>
      <PageTitle>내페이지</PageTitle>
      <div>기본정보</div>
      <FlexBox>
        <ImgDiv src={profile_image} />
        <div>
          <div>이메일 {email} </div>
          <div>닉네임 {nickname} </div>
        </div>
      </FlexBox>
    </ProfileBlock>
  );
};

export default Profile;
