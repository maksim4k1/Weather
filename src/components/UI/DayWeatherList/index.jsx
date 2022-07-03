import React from "react";
import styled from "styled-components";

const WeatherList = styled.ul`
  padding: 0 30px 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
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
      padding: 0 15px 20px;
    }
  }
`;

function DayWeatherList ({children}) {
  return(
    <WeatherList>
      {
        children
      }
    </WeatherList>
  );
}

export default DayWeatherList;