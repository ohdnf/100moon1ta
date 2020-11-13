import React from "react";
import styled, { css } from "styled-components";
import mainTheme from "../../lib/styles/mainTheme";

const buttonStyle = css`
  border: none;
  border-radius: 15px;
  height: 3rem;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.1rem 1rem;
  color: White;
  outline: none;
  margin: 0.15rem 0 0 0;
  cursor: pointer;
  background: #241654;

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
    `}
  ${(props) =>
    props.red &&
    css`
      background: ${mainTheme.mainBorder};
    `}
  ${(props) =>
    props.disabled &&
    css`
      background: #ccc;
    `}
  ${(props) => 
    props.github &&
    css`
      background-color: #222222;
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const Button = (props) => {
  return <StyledButton {...props} />;
};

export default Button;
