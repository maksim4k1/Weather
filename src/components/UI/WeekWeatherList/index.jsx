import React from "react";
import styled from "styled-components";
import { gap } from "../../../styles/mixins";

const List = styled.ul`
  width: 100%;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
  ${gap("20px")}
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.15);
    background: var(--color-white);
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-blue);
    border-radius: 3px;
  }
  @media screen and (max-width: 400px){
    &{
      padding: 10px 15px;
    }
  }
`;

function WeekWeatherList ({children}) {
  return(
    <List>
      {
        children
      }
    </List>
  );
}

export default WeekWeatherList;