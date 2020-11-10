import React from 'react';
import styled from 'styled-components';

const PaginationBlock = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0.5rem;
  text-align: center;
  border: 0.25rem solid black;
`;
const FlexDiv = styled.div`
  display: flex;
`;
const StyledDiv = styled.div`
  width: 2rem;
  height: 2rem;
  background: ${(props) => props.now ? "blue" : "white" };
`;

const Pagination = ({page, setPage, pageIndex, setPageIndex, maxPage}) => {
  const isFirstPageIndex = pageIndex > 1 ? false : true
  const isLastPageIndex = maxPage > pageIndex*10 ? false : true
  const PageRange = function() {
    if (!maxPage) return [];
    if (isLastPageIndex) {
      // 라스트 인덱스
      const numberOfPageAtLastIndex = maxPage-((pageIndex-1)*10)
      return new Array(numberOfPageAtLastIndex).fill(0).map((a, i) => (i+1)+(pageIndex-1)*10);
    } else {
      // 라스트 인덱스 아님 => 무조건 10개
      return new Array(10).fill(0).map((a, i) => (i+1)+(pageIndex-1)*10);
    }
  }
  return (
    <PaginationBlock>
      <FlexDiv>
        {
          !isFirstPageIndex &&
          <StyledDiv onClick={()=>{setPageIndex(pageIndex-1)}}> {"<"} </StyledDiv>
        }
        {maxPage !== 0 &&
          PageRange().map((p) => (
            <StyledDiv
              now={page === p}
              onClick={() => {
                setPage(p)
              }}
              key={p}
            >
              {p}
            </StyledDiv>
          ))}
        {
          !isLastPageIndex &&
          <StyledDiv onClick={()=>{setPageIndex(pageIndex+1)}}> {">"} </StyledDiv>
        }

      </FlexDiv>
    </PaginationBlock>
  );
};

export default Pagination;
