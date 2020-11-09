import React from "react";
import styled from "styled-components";

const StyledPageTitle = styled.div`
    font-size: 1.25rem;
    font-weight: bold;
`;

const PageTitle = (props) => {
  return <StyledPageTitle {...props} />;
};

export default PageTitle;
