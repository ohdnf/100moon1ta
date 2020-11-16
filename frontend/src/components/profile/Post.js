import React from 'react';
import styled, { css } from 'styled-components';

const PostBlock = styled.div`
  background: Azure;
  margin: 0.1rem 0.25rem;
`;
const PostTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bolder;
  margin-right: 1rem;
`;
const PostItem = styled.div`
  font-weight: bolder;
  margin: 0 0.25rem;
`
const FlexBox = styled.div`
  display: flex;
  align-items: center;
  ${(props) =>
    props.spaceBetween &&
    css`
      justify-content: space-between;
      border: 0.1rem solid black;
      margin: 0.1rem 0;
    `
  }
`

const Post = () => {
  const sampleData = [
    { title: "Post 샘플 1", createAt: "2020.10.03" },
    { title: "Post 샘플 2", createAt: "2020.10.05" },
    { title: "Post 샘플 3", createAt: "2020.10.07" },
  ]
  return (
    <PostBlock>
      {sampleData &&
        sampleData.map((item) => (
          <FlexBox spaceBetween key={item.title}>
            <PostTitle>{item.title}</PostTitle>
            <div>
              <FlexBox>
                <PostItem>{item.createAt}</PostItem>
                <PostItem onClick={() => alert("삭제버튼이 눌렸습니다.")}>삭제</PostItem>
              </FlexBox>
            </div>
          </FlexBox>
        ))}
    </PostBlock>
  );
};

export default Post;
