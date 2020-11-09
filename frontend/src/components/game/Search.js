import React from 'react';
import styled from 'styled-components';
import PageTitle from '../common/PageTitle'

const SearchBlock = styled.div`
  background: Azure;
  border: 0.25rem solid BlueViolet;
`;
// const SearchTitle = styled.div`
//   font-size: 1.2rem;
//   font-weight: bolder;
// `;

const SearchInput = styled.input`
  margin: 1rem;
  width: 95%;
`;
const TagBlock = styled.div`
  margin: 0.25rem;
  display: flex;
  background: Aquamarine;
`;

const TagItem = styled.div`
  margin-right: 0.25rem;
  padding: 0.25rem;
  background: DodgerBlue;
  border: 0.01rem solid black;
  border-radius: 0.5rem;
  text-align: center;
`;

const Search = () => {
  return (
    <SearchBlock>
      
      <PageTitle>소스 목록</PageTitle>
      <SearchInput placeholder="검색어를 입력하세요" />
      <TagBlock>
        {[0, 1, 2, 3, 4].map((item) => (
          <TagItem key={item}>태그{item}</TagItem>
        ))}
      </TagBlock>
      <TagBlock>
        {[6, 7, 8, 9, 10].map((item) => (
          <TagItem key={item}>태그{item}</TagItem>
        ))}
      </TagBlock>
    </SearchBlock>
  );
};

export default Search;
