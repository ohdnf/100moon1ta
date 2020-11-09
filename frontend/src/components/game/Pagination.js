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
  width: 1rem;
  height: 1rem;
  backgrount: ${(props) => props.now ? "blue" : "white" };
`;
/*
	페이지 네이션
	1. 한 페이지에 10개씩
	2. 한 번에 5페이지씩
	=> 한 세트 : 50개
    
	1. 계산
		cnt_pages : n // 10 + 1 if n % 10
		cnt_set : cnt_pages // 5 + 1 if cnt_pages % 5
	2. 버튼
		우측 now_set != cnt_set => enable
		좌측 set != 1 => enable
		(now_set*5)-4 ~ min( (now_set*5) , cnt_set ) 
	3. 출력
		items 걍 출력?
*/
const Pagination = ({page, setPage, pageIndex, setPageIndex, maxPage}) => {
  const PageRange = function() {
    if (maxPage === 0) return [];
    if (maxPage <= pageIndex*10) {
      // 1, 1
      // 100 < 10
      // 1,2,3,4,5,6,7,8,9,10
      // 0 => 
      return new Array(maxPage % 10 ? parseInt(maxPage % 10) + 1 : parseInt(maxPage % 10) ).fill(0).map((a, i) => i+1+(pageIndex-1)*10);
    } else {
      return new Array(10).fill(0).map((a, i) => i+1+(pageIndex-1)*10);
    }
  }
  return (
    <PaginationBlock>
      <FlexDiv>
        {
          pageIndex >= 2 &&
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
          maxPage > pageIndex*10 &&
          <StyledDiv onClick={()=>{setPageIndex(pageIndex+1)}}> {">"} </StyledDiv>
        }

      </FlexDiv>
    </PaginationBlock>
  );
};

export default Pagination;
