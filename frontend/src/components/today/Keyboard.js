import React from 'react';
import styled, {css} from 'styled-components';

const KeyboardBlock = styled.div`
  width: 100%;
`
const LayoutBlock = styled.div`
	max-width: 1085px;
	padding: 20px;
	background-color: rgb(197, 197, 197);
	border-radius: 10px;
	display: grid;
	grid-template-columns: repeat(30, 30px);
	grid-template-rows: repeat(5, 60px);
	grid-gap: 5px;
`;

const KeyBlock = styled.div`
	&.key {
		border: 2px solid black;
		border-radius: 5px;
		grid-column: span 2;
		font-size: 20px;
		text-align: center;
		padding-top: 17px;
	}

	&.delete {
		grid-column: span 4;
	}

	&.tab {
		grid-column: span 3;
	}

	&.backslash {
		grid-column: span 3;
	}

	&.capslock {
		grid-column: span 4;
	}

	&.return {
		grid-column: span 4;
	}

	&.leftshift {
		grid-column: span 5;
	}

	&.rightshift {
		grid-column: span 5;
	}

	&.leftctrl {
		grid-column: span 3;
	}

	&.command {
		grid-column: span 3;
		font-size: 14px;
	}

	&.space {
		grid-column: span 13;
	}

	${(props) => {
		const currCount = props.typoCount;
		if (currCount > 0 && currCount <= 5) {
			return css`background: yellow;`
		} else if (currCount > 5 && currCount < 10) {
			return css`background: orange;`
		} else if (currCount >= 10) {
			return css`background: red;`
		}
		return css`background: rgb(243, 243, 243);`
	}}
`;

const UpperLetter = styled.div`
 font-size: 12px;
 padding-top: -3px;
`;

const Keyboard = ({typos}) => {

	const keyMapping = {
		"`":"tilt", "~":"tilt", "1":"one", "!":"one", "2":"two", "@":"two", "3":"three", "#":"three",
		"4":"four", "$":"four", "5":"five", "%":"five", "6":"six", "^":"six", "7":"seven", "&":"seven",
		"8":"eight", "*":"eight", "9":"nine", "(":"nine", "0":"zero", ")":"zero", "-":"hyphen", "_":"hyphen",
		"=":"equal", "+":"equal", "q":"ch-q", "Q":"ch-q", "w":"ch-w", "W":"ch-w", "e":"ch-e", "E":"ch-e",
		"r":"ch-r", "R": "ch-r", "t":"ch-t", "T":"ch-t", "y":"ch-y", "Y":"ch-y", "u":"ch-u", "U":"ch-u",
		"i":"ch-i", "I":"ch-i", "o":"ch-o", "O":"ch-o", "p":"ch-p", "P":"ch-p", "[":"bracket-open", 
		"{":"bracket-open", "\\":"backslash", "|":"backslash", "a":"ch-a", "A":"ch-a", "s":"ch-s", "S":"ch-s",
		"d":"ch-d", "D":"ch-d", "f":"ch-f", "F":"ch-f", "g":"ch-g", "G":"ch-g", "h":"ch-h", "H":"ch-h",
		"j":"ch-j", "J":"ch-j", "k":"ch-k", "K":"ch-k", "l":"ch-l", "L":"ch-l", ";":"semi-colon", ":":"semi-colon",
		"'":"quote", "\"":"quote", "z":"ch-z", "Z":"ch-z", "x":"ch-x", "X":"ch-x", "c":"ch-c", "C":"ch-c",
		"v":"ch-v", "V":"ch-v", "b":"ch-b", "B":"ch-b", "n":"ch-n", "N":"ch-n", "m":"ch-m", "M":"ch-m",
		",":"comma", "<":"comma", ".":"dot", ">":"dot", "/":"slash", "?":"slash"
	};

	const countTypo = {
		"tilt": 0,
		"one": 0,
		"two": 0,
		"three": 0,
		"four": 0,
		"five": 0,
		"six": 0,
		"seven": 0,
		"eight": 0,
		"nine": 0,
		"zero": 0,
		"hyphen": 0,
		"equal": 0,
		"ch-q": 0,
		"ch-w": 0,
		"ch-e": 0,
		"ch-r": 0,
		"ch-t": 0,
		"ch-y": 0,
		"ch-u": 0,
		"ch-i": 0,
		"ch-o": 0,
		"ch-p": 0,
		"bracket-open": 0,
		"brachet-close": 0,
		"backslash": 0,
		"ch-a": 0,
		"ch-s": 0,
		"ch-d": 0,
		"ch-f": 0,
		"ch-g": 0,
		"ch-h": 0,
		"ch-j": 0,
		"ch-k": 0,
		"ch-l": 0,
		"semi-colon": 0,
		"quote": 0,
		"ch-z": 0,
		"ch-x": 0,
		"ch-c": 0,
		"ch-v": 0,
		"ch-b": 0,
		"ch-n": 0,
		"ch-m": 0,
		"comma": 0,
		"dot": 0,
		"slash": 0
	}

	if (typos) {
		for (let typo in typos) {
			const className = keyMapping[typo];
			countTypo[className] = countTypo[className] + typos[typo];
		};
	};

  return (
		<KeyboardBlock>
			<h3> 히트맵 </h3>
			<LayoutBlock> 키보드 레이아웃 영역 </LayoutBlock>
		</KeyboardBlock>
	)
};

export default Keyboard;
