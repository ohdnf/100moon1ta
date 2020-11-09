import React from 'react';
import styled from 'styled-components'

const PaginationBlock = styled.div`
	position: fixed;
	left: 50%;
	bottom: 0.5rem;
	text-align: center;
	border: 0.25rem solid black;
`
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

const Pagination = () => {
  return (
		<PaginationBlock>
			페이지네이션 공간
		</PaginationBlock>
  );
};

export default Pagination;
