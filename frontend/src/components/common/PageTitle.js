import React from "react";
import styled, { css } from "styled-components";
import mainTheme from "../../lib/styles/mainTheme";

const StyledPageTitle = styled.div`
    font-size: 1.25rem;
    font-weight: bold;
`;

const PageTitle = (props) => {
  return <StyledPageTitle {...props} />;
};

export default PageTitle;
