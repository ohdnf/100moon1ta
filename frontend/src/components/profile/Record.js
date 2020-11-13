import React from 'react';
import { useHistory } from 'react-router';
import styled, { css } from 'styled-components';

const RecordBlock = styled.div`
  background: Azure;
  margin: 0.1rem 0.25rem;
`;
const RecordTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bolder;
  margin-right: 1rem;
  :hover {
    cursor: pointer;
  }
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

const Record = ({ records }) => {
  const history = useHistory()
  return (
    <RecordBlock >
      {records &&
        records.map((record) => (
          <FlexBox spaceBetween key={record.id} >
            <div>
              <FlexBox>
                <RecordTitle onClick={()=>{history.push(`/games/${record.id}`)}} >{record.title}</RecordTitle>
                <RecordItem>{ record.time }초</RecordItem>
                <RecordItem>{ record.percent }%</RecordItem>
                <RecordItem>{ record.grade }점</RecordItem>
              </FlexBox>
            </div>
            <RecordItem>{ record.createAt }</RecordItem>
          </FlexBox>
        ))}
    </RecordBlock>
  );
};

export default Record;
