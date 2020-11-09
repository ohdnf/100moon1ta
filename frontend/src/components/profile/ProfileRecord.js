import React from 'react';
import styled from 'styled-components';
import PageTitle from '../common/PageTitle'

const ProfileRecordBlock = styled.div`
  background: Azure;
  border: 0.25rem solid BlueViolet;
`;
const ProfileRecordTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bolder;
`;

const ProfileRecordInput = styled.input`
  margin: 1rem;
  width: 95%;
`;
const TagBlock = styled.div`
  margin: 0.25rem;
  display: flex;
  background: Aquamarine;
`;

const TagItem = styled.div`
  margin-right: 0.25rem;
  padding: 0.25rem;
  background: DodgerBlue;
  border: 0.01rem solid black;
  border-radius: 0.5rem;
  text-align: center;
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
