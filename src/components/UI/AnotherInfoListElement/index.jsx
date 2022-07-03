import React from "react";
import styled from "styled-components";
import { gap } from "../../../styles/mixins";

const AnotherInfoElement = styled.li`
  width: 170px;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  flex-flow: column;
  ${gap("15px")}
  background: var(--color-main);
  border-radius: 20px;
  box-shadow: 0 0 8px var(--color-white-shadow);
  @media screen and (max-width: 400px){
    &{
      width: 130px;
    }
  }
`;
const AnotherInfoElementTitle = styled.h6`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  @media screen and (max-width: 400px){
    &{
      font-size: 13px;
    }
  }
`;
const AnotherInfoElementValue = styled.div`
  font-size: 18px;
  @media screen and (max-width: 400px){
    &{
      font-size: 14px;
    }
  }
`;

function AnotherInfoListElement ({title, value}) {
  return(
    <AnotherInfoElement>
      <AnotherInfoElementTitle>{title}</AnotherInfoElementTitle>
      <AnotherInfoElementValue>{value}</AnotherInfoElementValue>
    </AnotherInfoElement>
  );
}

export default AnotherInfoListElement;