import React from "react";
import styled from "styled-components";

const StyledPageTitle = styled.div`
  margin: 0 2rem;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: default;
`;

const PageTitle = (props) => {
  return <StyledPageTitle {...props} />;
};

export default PageTitle;
