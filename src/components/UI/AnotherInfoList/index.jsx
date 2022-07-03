import React from "react";
import styled from "styled-components";
import { gap } from "../../../styles/mixins";

const AnotherInfo = styled.ul`
  padding: 0 15px;
  display: flex;
  justify-content: space-evenly;
  flex-flow: wrap;
  ${gap("30px")}
  @media screen and (max-width: 400px){
    &{
      ${gap("15px")}
    }  
  }
`;

function AnotherInfoList ({children}) {
  return(
    <AnotherInfo>
      {
        children
      }
    </AnotherInfo>
  );
}

export default AnotherInfoList;