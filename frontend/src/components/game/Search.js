import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PageTitle from '../common/PageTitle';

const SearchBlock = styled.div`
  width: 67%;
  margin: 2rem auto;
`;

const SearchInput = styled.input`
  margin: 1rem 2rem;
  padding: 0.5rem 1rem;
  width: 82%;
`;
const TagBlock = styled.div`
  margin: 0rem 2rem;
  display: flex;
`;

const TagItemBlock = styled.div`
  margin-right: 0.25rem;
  padding: 0.25rem;
  background: Gray;
  border: 0.01rem solid black;
  border-radius: 0.5rem;
  text-align: center;
  opacity: 0.5;
  :hover {
    cursor: pointer;
  }
  ${(props) =>
    props.selected &&
    css`
      opacity: 1;
    `}
`;

const TagItem = ({ tag, queryTags, setQueryTags }) => {
  const [isSelected, setIsSelected] = useState(false);
  const { content, id } = tag;
  const onClick = () => {
    if (isSelected) {
      setIsSelected(!isSelected);
      let nextArray = queryTags.filter((t) => t.id !== id);
      setQueryTags(nextArray);
    } else {
      setIsSelected(!isSelected);
      let nextArray = queryTags.concat(tag);
      setQueryTags(nextArray);
    }
  };

  return (
    <TagItemBlock selected={isSelected} onClick={onClick}>
      {content}
    </TagItemBlock>
  );
};
const Search = ({
  mostTags,
  query,
  setQuery,
  queryTags,
  setQueryTags,
  onEnter,
}) => {
  const onKeyPress = (e) => {
    if (e.code === 'Enter') {
      onEnter();
    }
  };
  const onChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <SearchBlock>
      <PageTitle>소스 목록</PageTitle>
      <SearchInput
        placeholder="검색어를 입력하세요"
        value={query}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <TagBlock>
        {mostTags &&
          mostTags.map((tag) => (
            <TagItem
              key={tag.id}
              tag={tag}
              queryTags={queryTags}
              setQueryTags={setQueryTags}
            ></TagItem>
          ))}
      </TagBlock>
    </SearchBlock>
  );
};

export default Search;
