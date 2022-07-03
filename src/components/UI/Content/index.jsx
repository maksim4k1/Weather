import React from "react";
import styled from "styled-components";
import { gap } from "../../../styles/mixins";

const ContentElement = styled.div`
  display: flex;
  flex-flow: column;
  ${gap("40px")}
`;

function Content ({children}) {
  return(
    <ContentElement>
      {
        children
      }
    </ContentElement>
  );
}

export default Content;