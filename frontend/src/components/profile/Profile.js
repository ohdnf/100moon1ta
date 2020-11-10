import React from 'react';
import styled from 'styled-components';
import PageTitle from '../common/PageTitle';

const ProfileBlock = styled.div`
  background: Azure;
  border: 0.25rem solid BlueViolet;
`;
// const ProfileTitle = styled.div`
//   font-size: 1.2rem;
//   font-weight: bolder;
// `;

// const ProfileInput = styled.input`
//   margin: 1rem;
//   width: 95%;
// `;
// const TagBlock = styled.div`
//   margin: 0.25rem;
//   display: flex;
//   background: Aquamarine;
// `;

// const TagItem = styled.div`
//   margin-right: 0.25rem;
//   padding: 0.25rem;
//   background: DodgerBlue;
//   border: 0.01rem solid black;
//   border-radius: 0.5rem;
//   text-align: center;
// `;

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
  const { email, nickname } = userProfile;
  return (
    <ProfileBlock>
      <PageTitle>내페이지</PageTitle>
      <div>기본정보</div>
      <FlexBox>
        <ImgDiv src="https://source.unsplash.com/random/100x100" />
        <div>
          <div>이메일 {email} </div>
          <div>닉네임 {nickname} </div>
        </div>
      </FlexBox>
    </ProfileBlock>
  );
};

export default Profile;
