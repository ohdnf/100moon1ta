import React from 'react';
import styled from 'styled-components';
// import PageTitle from '../common/PageTitle'

const ProfileRecordBlock = styled.div`
  background: Azure;
  border: 0.25rem solid BlueViolet;
`;

const FlexBox = styled.div`
  display: flex;
`
const ProfileRecord = () => {
  return (
    <ProfileRecordBlock>
      <div>종합 기록</div>
      <FlexBox>
        <div>
          <div> 총 점수 </div>
          <div> 777점 </div>
        </div>
        <div>
          <div> 평균 속도 </div>
          <div> 999초 </div>
        </div>
        <div>
          <div> 평균 정확도 </div>
          <div> 99.99% </div>
        </div>
      </FlexBox>
    </ProfileRecordBlock>
  );
};

export default ProfileRecord;
