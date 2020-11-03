import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

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
// cursor: auto / default(화살표) / pointer / wait

const Summary = () => {
  const { title, tags, content, description, link } = {
    title: '리액트 함수형 컴포넌트',
    tags: ['태그1', '태그2', '태그3'],
    content: "Hi. I'm hyunjun. How are you?",
    description: '자기소개입니다.',
    link: 'www.edu.ssafy.com',
  };
  const history = useHistory();
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
                  <GameDataItemText>32초</GameDataItemText>
                </GameDataItem>
              </GameDataItemBlock>
              <GameDataItemBlock>
                <GameDataItem>
                  <GameDataItemText>오타율</GameDataItemText>
                  <GameDataItemText>0.15%</GameDataItemText>
                </GameDataItem>
              </GameDataItemBlock>
              <GameDataItemBlock>
                <GameDataItem>
                  <GameDataItemText>획득 점수</GameDataItemText>
                  <GameDataItemText>85점</GameDataItemText>
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
