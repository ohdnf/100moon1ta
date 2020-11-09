import React from 'react';
import styled from 'styled-components';

const KeyboardBlock = styled.div`
  width: 100%;
`
const LayoutBlock = styled.div`
	width: 100%;
	height: 10rem;
	background: DarkSeaGreen;
	border: 1px solid Black;
`
const Keyboard = () => {
  return (
		<KeyboardBlock>
			<h3> 히트맵 </h3>
			<LayoutBlock> 키보드 레이아웃 영역 </LayoutBlock>
		</KeyboardBlock>
	)
};

export default Keyboard;
