import React from 'react';
import styled from 'styled-components';
// import PageTitle from '../common/PageTitle'

const ProfileRecordBlock = styled.div`
  background: Azure;
  border: 0.25rem solid BlueViolet;
`;

const FlexBox = styled.div`
  display: flex;
  `;
const ProfileRecord = ({ userRecord }) => {
  const { grade, time, accuracy } = userRecord;
  return (
    <ProfileRecordBlock>
      <div>종합 기록</div>
      <FlexBox>
        <div>
          <div> 총 점수 </div>
          <div> {grade}}점 </div>
        </div>
        <div>
          <div> 평균 시간 </div>
          <div> {time}초 </div>
        </div>
        <div>
          <div> 평균 정확도 </div>
          <div> {accuracy}% </div>
        </div>
      </FlexBox>
    </ProfileRecordBlock>
  );
};

export default ProfileRecord;
