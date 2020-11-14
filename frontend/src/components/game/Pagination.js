import React from 'react';
import styled from 'styled-components';

const PaginationBlock = styled.div`
  background: teal;
  position: fixed;
  left: 50%;
  margin-left: -${(props)=>props.number+1}rem;
  bottom: 0rem;
  text-align: center;
`;
const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledDiv = styled.div`
  width: 2rem;
  height: 2rem;
  background: ${(props) =>
    props.now ? 'blue' : props.disabled ? 'gray' : 'white'};
`;

const Pagination = ({
  page,
  start,
  endOfPage,
  onRight,
  onLeft,
  onClick,
  disableRight,
  disableLeft,
}) => {
  // 출력될 Pagination 숫자 갯수
  const number = endOfPage - (start - 1) < 10 ? endOfPage - (start - 1) : 10;

  const pageRange = Array.from({ length: number }, (v, i) => i + start);
  return (
    <PaginationBlock number={number}>
      <FlexDiv>
        <StyledDiv onClick={onLeft} disabled={disableLeft}>
          {'<'}
        </StyledDiv>
        {pageRange.map((p) => (
          <StyledDiv now={page === p} onClick={() => onClick(p)} key={p}>
            {p}
          </StyledDiv>
        ))}
        <StyledDiv onClick={onRight} disabled={disableRight}>
          {'>'}
        </StyledDiv>
      </FlexDiv>
    </PaginationBlock>
  );
};

export default Pagination;
