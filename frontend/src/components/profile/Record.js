import React from 'react';
import styled, { css } from 'styled-components';

const RecordBlock = styled.div`
  background: Azure;
  margin: 0.1rem 0.25rem;
`;
const RecordTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bolder;
  margin-right: 1rem;
`;
const RecordItem = styled.div`
  font-weight: bolder;
  margin: 0 0.25rem;
`
const FlexBox = styled.div`
  display: flex;
  align-items: center;
  ${(props)=>
    props.spaceBetween &&
    css`
      justify-content: space-between;
      border: 0.1rem solid black;
      margin: 0.1rem 0;
    `
  }
`

const Record = () => {
  const sampleData = [
    { title: "기록 샘플 첫번째 타이틀", time:20, percent:92, grade:92, createAt: "2020.10.03"},
    { title: "기록 샘플 두번째 타이틀", time:51, percent:95, grade:95, createAt: "2020.10.05"},
    { title: "기록 샘플 세번째 타이틀", time:33, percent:90, grade:90, createAt: "2020.10.07"},
  ]
  return (
    <RecordBlock>
      {sampleData &&
        sampleData.map((item) => (
          <FlexBox spaceBetween key={item.title}>
            <div>
              <FlexBox>
                <RecordTitle>{item.title}</RecordTitle>
                <RecordItem>{ item.time }초</RecordItem>
                <RecordItem>{ item.percent }%</RecordItem>
                <RecordItem>{ item.grade }점</RecordItem>
              </FlexBox>
            </div>
            <RecordItem>{ item.createAt }</RecordItem>
          </FlexBox>
        ))}
    </RecordBlock>
  );
};

export default Record;
