import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const SourceBlock = styled.div`
  width: 100%;
  background: LightGreen;
`;

const TagBlock = styled.div`
  margin: 1rem 0;
  background: DarkSeaGreen;
  align-items: center;
  display: flex;
`;

const TagItem = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-right: 0.5rem;
  background: ForestGreen;
  color: White;
`;

const ContentDiv = styled.div`
  height: 20rem;
  border: 0.25rem solid Black;
  background: LightSteelBlue;
`;

const DescriptionDiv = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  background: LightSalmon;
`;
const LinkDiv = styled.div`
  font-size: 1.25rem;
  backoground: LightSkyBlue;
`;
// cursor: auto / default(화살표) / pointer / wait

const Source = ({ todayContent }) => {
  const { title, tags, content, description, link } = {
    title: todayContent?.title || '리액트 함수형 컴포넌트',
    tags: todayContent?.tags || ['태그1', '태그2', '태그3'],
    content: todayContent?.content || "Hi. I'm hyunjun. How are you?",
    description: todayContent?.description || '자기소개입니다.',
    link: todayContent?.link || 'www.edu.ssafy.com',
  };
  const history = useHistory();
  return (
    <SourceBlock>
      <div>오늘의 타자</div>
      <div>{title}</div>
      <TagBlock>
        {tags.map((tag) => (
          <TagItem key={tag}>{tag}</TagItem>
        ))}
      </TagBlock>
      <ContentDiv>{content}</ContentDiv>
      <DescriptionDiv>{description}</DescriptionDiv>
      <LinkDiv>{link}</LinkDiv>
    </SourceBlock>
  );
};

export default Source;
