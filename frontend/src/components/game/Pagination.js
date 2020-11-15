import React from 'react';
import styled from 'styled-components';

const PaginationBlock = styled.div`
  position: fixed;
  left: 50%;
  margin-left: -${(props) => props.number + 1}rem;
  bottom: 0rem;
  text-align: center;
`;
const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ArrowDiv = styled.div`
  width: 2rem;
  height: 2rem;
  background: gray;
  :hover {
    cursor: ${(props) =>
    props.disabled ? 'not-allowed' : 'pointer'};
  }
`;
const StyledDiv = styled.div`
  width: 2rem;
  height: 2rem;
  background: ${(props) => props.now ? 'blue' : 'white'};
  :hover {
    cursor: ${(props) =>
    props.now ? 'default' : 'pointer'};
  }
`;

const Pagination = ({
  page,
  endOfPage,
  onRight,
  onLeft,
  onClick,
  disableRight,
  disableLeft,
}) => {
  const number = endOfPage;
  const pageRange = Array.from({ length: endOfPage }, (v, i) => i + 1);
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
