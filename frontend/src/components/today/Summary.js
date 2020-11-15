import React from 'react';
import styled from 'styled-components';

const SummaryBlock = styled.div`
  width: 100%;
  background: DodgerBlue;
`;

const FlexDiv = styled.div`
  display: flex;
`;
const GameDataItemBlock = styled.div`
  display: flex;
  align-items: center;
  margin-auto;
  background: DarkSeaGreen;
`;

const GameDataItem = styled.div`
  background: ForestGreen;
  align-items: center;
`;

const GameDataItemText = styled.div`
  background: DogerBlue;
`;

const GuideBlock = styled.div`
  background: DarkSeaGreen;
`;

const Summary = ({ point, end, accuracy }) => {
  return (
    <>
      <div>타자연습 Summary</div>
      <SummaryBlock>
        <FlexDiv>
          <div>
            <FlexDiv>
              <GameDataItemBlock>
                <GameDataItem>
                  <GameDataItemText>걸린 시간</GameDataItemText>
                  <GameDataItemText>{end}초</GameDataItemText>
                </GameDataItem>
              </GameDataItemBlock>
              <GameDataItemBlock>
                <GameDataItem>
                  <GameDataItemText>정확도</GameDataItemText>
                  <GameDataItemText>{accuracy}%</GameDataItemText>
                </GameDataItem>
              </GameDataItemBlock>
              <GameDataItemBlock>
                <GameDataItem>
                  <GameDataItemText>획득 점수</GameDataItemText>
                  <GameDataItemText>{point}점</GameDataItemText>
                </GameDataItem>
              </GameDataItemBlock>
            </FlexDiv>
          </div>
          <GuideBlock>
            <div>점수 선정 방식</div>
            <div>첫 연습 : 100 * (정답률)점</div>
            <div>재 연습 : 10 * (정답률)점</div>
          </GuideBlock>
        </FlexDiv>
      </SummaryBlock>
    </>
  );
};

export default Summary;
