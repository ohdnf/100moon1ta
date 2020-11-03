import React from 'react';
import styled from 'styled-components';
import { FaBookmark, FaPython } from 'react-icons/fa';

const ResultBlock = styled.div`
  background: DeepSkyBlue;
  border: 0.25rem solid BlueViolet;
`;

const ResultTitleBlock = styled.div`
  display: flex;
  justify-content: space-between;
  background: LightGray;
`;
const ResultTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bolder;
`;

const HamburgerButton = styled.image`
  display: block;
`;

const ResultItemBlock = styled.div`
  margin: 0.25rem;
  background: DeepPink;
`;

const ResultItem = styled.div`
  margin: 0.25rem 0;
  display: flex;
  background: ForestGreen;
  justify-content: space-between;
`;

const ItemImage = styled.image`
  display: block;
`;

const ItemTitle = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  height: 100%;
`;
const ItemTagBlock = styled.div`
  margin: 0.25rem;
  display: flex;
  background: Aquamarine;
`;

const ItemTag = styled.div`
  margin-right: 0.25rem;
  padding: 0.25rem;
  background: DodgerBlue;
  border: 0.01rem solid black;
  border-radius: 0.5rem;
  text-align: center;
`;

const FlexDiv = styled.div`
  display: flex;
`
const Result = () => {
  // 샘플 데이터
  const sampleArray = [
    {
      no: 1,
      image: `../../images/js.png`,
      title: '리액트를 다루는 기술',
      tags: ['react', 'javascript', 'front'],
      isBookmarked: false,
    },
    {
      no: 2,
      image: `../../images/js.png`,
      title: '리액트 뽀개기',
      tags: ['react', 'javascript', 'front'],
      isBookmarked: true,
    },
    {
      no: 3,
      image: `../../images/js.png`,
      title: 'Docker 새로운 시작',
      tags: ['react', 'javascript', 'front'],
      isBookmarked: false,
    },
  ];
  return (
    <ResultBlock>
      <ResultTitleBlock>
        <ResultTitle>검색 결과</ResultTitle>
        <img src={require('../../images/hamburger.png')} height="40rem" alt="hamburger Button"/>
      </ResultTitleBlock>
      <ResultItemBlock>
        {sampleArray.map((item) => (
          <ResultItem key="item.no">
            <div>
              <FlexDiv>
                <img src={require('../../images/js.png')} height="40rem" alt="JS" />
                <ItemTitle> {item.title} </ItemTitle>

              </FlexDiv>
            </div>
            <div>
              <FlexDiv>
                <ItemTagBlock>
                  {item.tags?.length &&
                    item.tags.map((tag) => <ItemTag>{tag}</ItemTag>)}
                </ItemTagBlock>
                <img
                  src={require(item.isBookmarked
                    ? '../../images/bookmark3.png'
                    : '../../images/bookmark2.png')}
                  height="40rem"
                  alt="bookmark1"
                />
              </FlexDiv>
            </div>
          </ResultItem>
        ))}
      </ResultItemBlock>
    </ResultBlock>
  );
};

export default Result;
