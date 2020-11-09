import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

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

const ResultItemDiv = styled.div`
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
`;

const ResultItem = ({ game }) => {
  const { title, tags, subscribers } = game;
  // const { user } = useSelector(({ user }) => ({
  //   user: user.user,
  // }));
  const user = { email: 'gabrielshaw@hunter.net' };
  let isBookmarked = false;
  if (subscribers) {
    subscribers.forEach((subscriber) => {
      if (subscriber.email === user.email) {
        isBookmarked = true;
      }
    });
  }
  return (
    <ResultItemDiv>
      <div>
        <FlexDiv>
          <img src={require('../../images/js.png')} height="40rem" alt="JS" />
          {/* <div>{category}</div> */}
          <ItemTitle> {title || '기본 타이틀'} </ItemTitle>
        </FlexDiv>
      </div>
      <div>
        <FlexDiv>
          <ItemTagBlock>
            {tags?.length &&
              tags.map((tag) => <ItemTag key={tag.content}>{tag.content}</ItemTag>)}
          </ItemTagBlock>
          <img
            src={require(isBookmarked
              ? '../../images/bookmark3.png'
              : '../../images/bookmark2.png')}
            height="40rem"
            alt="bookmark1"
          />
        </FlexDiv>
      </div>
    </ResultItemDiv>
  );
};

const Result = ({ games }) => {

  /* 
  game
  "id": Int,
  "category": Stirng,
  "length": Int,
  "difficulty": Int,
  "likers": [ objects ]
    "id": Int,
    "email": String,
    "username": String,
    "profile_image": null, => 아직 구현아닌듯
    "comment": "", => 뭘까(랭킹의 그 문구인듯)
  "subscribers" : [ objects ]
    위와 동일
  요청중
  "title" : 타이틀
  "description": 설명
  출처는 안해도 됨
*/

  return (
    <ResultBlock>
      <ResultTitleBlock>
        <ResultTitle>검색 결과</ResultTitle>
        <img
          src={require('../../images/hamburger.png')}
          height="40rem"
          alt="hamburger Button"
        />
      </ResultTitleBlock>
      <ResultItemBlock>
        {games && games.map((game) => <ResultItem key={game.id} game={game} />)}
      </ResultItemBlock>
    </ResultBlock>
  );
};

export default Result;