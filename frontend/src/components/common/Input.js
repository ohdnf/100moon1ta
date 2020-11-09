import React from "react";
import styled, { css } from "styled-components";

const StyledInput = styled.input`
  margin-top: 1rem;
  color: SlateGrey;
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;

const Input = ({ name, onChange, fullWidth }) => {
  const type = name === "password" ? "password" : "text";
  return (
    <>
      <StyledInput
        id={name}
        type={type}
        name={name}
        placeholder={name}
        required
        fullWidth={fullWidth}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
