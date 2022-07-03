import React from "react";
import styled from "styled-components";
import { gap } from "../../../styles/mixins";

const Element = styled.li`
  min-width: 75px;
  width: calc(100% / 2);
  display: flex;
  align-items: center;
  flex-flow: column;
  ${gap("15px")}
`;
const ElementTime = styled.h6`
  font-size: 13px;
  font-weight: 600;
`;
const ElementImage = styled.img`
  width: 60px;
  height: 60px;
  margin: -5px 0;
  display: block;
  border-radius: 20px;
  background: var(--color-blue);
  box-shadow: 0 0 8px var(--color-white-shadow);
`;
const ElementTemp = styled.div`
  font-size: 16px;
`;

function DayWeatherListElement ({time, temp, weatherIcon}) {
  return(
    <Element type="button" title="Подробнее">
      <ElementTime>{time}</ElementTime>
      <ElementImage src={weatherIcon} alt="" />
      <ElementTemp>{temp} c°</ElementTemp>
    </Element>
  );
}

export default DayWeatherListElement;