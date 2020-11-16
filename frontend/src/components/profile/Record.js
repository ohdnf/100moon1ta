import React from 'react';
import { useHistory } from 'react-router';
import styled, { css } from 'styled-components';

const RecordBlock = styled.div`
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
  ${(props) => props.bold && 'font-weight: bolder;'}
  margin: 0 0.25rem;
`;
const RecordBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Record = ({ records }) => {
  const history = useHistory();
  return (
    <RecordBlock>
      {records &&
        records.map((record) => (
          <RecordBox key={record.id}>
            <div>
              <RecordTitle
                bold
                onClick={() => {
                  history.push(`/games/${record.source.id}`);
                }}
              >
                {record.source.title}
              </RecordTitle>
            </div>

            <div>
              <FlexBox>
                <RecordItem>{record.game_time}초</RecordItem> | 
                <RecordItem>{record.precision}%</RecordItem> | 
                <RecordItem>{record.score}점</RecordItem> | 
                <RecordItem>{record.created_at.slice(0, 10)}</RecordItem>
              </FlexBox>
            </div>
          </RecordBox>
        ))}
    </RecordBlock>
  );
};

export default Record;
