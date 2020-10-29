import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  margin-top: 1rem;
  width: 100%;
  color: SlateGrey;
`;

const Input = ({ name, onChange }) => {
  const type = name === "password" ? "password" : "text";
  return (
    <>
      <StyledInput
        id={name}
        type={type}
        name={name}
        placeholder={name}
        required
        fullwidth
        onChange={onChange}
      />
    </>
  );
};

export default Input;
