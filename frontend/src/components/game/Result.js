import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { bookmarkGame } from '../../lib/api/user';
import { useSelector } from 'react-redux';

const ResultBlock = styled.div`
  background: DeepSkyBlue;
  border: 0.25rem solid BlueViolet;
  margin-bottom: 20rem;
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

// const HamburgerButton = styled.image`
//   display: block;
// `;

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

const ItemTitle = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  height: 100%;
  :hover {
    cursor: pointer;
  }
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
  justify-content: center;
  align-items: center;
`;

const ImgDiv = styled.img`
  display: block;
  :hover {
    cursor: pointer;
  }
`;

const StyledDiv = styled.div`
  margin-right: 0.25rem;
  ${(props) =>
    props.selected &&
    css`
      background: blue;
    `}
`;
export const ResultItem = ({ game }) => {
  const { id, title, tags, isSubscribe } = game;

  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const history = useHistory();
  const [isBookmarked, setIsBookmarked] = useState(
    isSubscribe || window.location.pathname === "/profile" ? true : false
  );

  const onBookmark = () => {
    if (!user) {
      alert('로그인이 필요합니다');
      return;
    }
    const data = {
      source_id: id,
    };
    bookmarkGame(data)
      .then((res) => {
        setIsBookmarked(!isBookmarked);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <ResultItemDiv>
      <div>
        <FlexDiv>
          <ItemTitle onClick={() => history.push(`/games/${id}`)}>
            {title || '기본 타이틀'}
          </ItemTitle>
        </FlexDiv>
      </div>
      <div>
        <FlexDiv>
          <ItemTagBlock>
            {tags?.length &&
              tags.map((tag, index) => (
                <ItemTag key={index}>{tag}</ItemTag>
              ))}
          </ItemTagBlock>
          <ImgDiv
            src={require(isBookmarked
              ? '../../images/bookmark3.png'
              : '../../images/bookmark2.png')}
            height="40rem"
            alt="bookmark1"
            onClick={onBookmark}
          />
        </FlexDiv>
      </div>
    </ResultItemDiv>
  );
};

const Result = ({ games, step, setStep }) => {
  return (
    <ResultBlock>
      <ResultTitleBlock>
        <ResultTitle>검색 결과</ResultTitle>
        <FlexDiv>
          <div>
            <div style={{ cursor: "default" }}>페이지당 보기</div>
            <FlexDiv>
              {[2, 3, 4, 5, 10, 20].map((n, index) => (
                <StyledDiv
                  key={index}
                  selected={step === n}
                  onClick={() => setStep(n)}
                >
                  {n}
                </StyledDiv>
              ))}
            </FlexDiv>
          </div>
        </FlexDiv>
      </ResultTitleBlock>
      <ResultItemBlock>
        {games && games.map((game) => <ResultItem key={game.id} game={game} />)}
      </ResultItemBlock>
    </ResultBlock>
  );
};

export default Result;
