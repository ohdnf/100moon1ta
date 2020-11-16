import React from 'react';
import styled from 'styled-components';

const ProfileBlock = styled.div`
`;

const PageTitle = styled.div`
  margin: 1rem 0;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: default;
`

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
  const { email, username, profile_image } = userProfile;
  return (
    <ProfileBlock>
      <PageTitle>마이 페이지</PageTitle>
      <FlexBox>
        <ImgDiv src={profile_image} />
        <div>
          <div>이메일 | {email} </div>
          <div>닉네임 | {username} </div>
        </div>
      </FlexBox>
    </ProfileBlock>
  );
};

export default Profile;
