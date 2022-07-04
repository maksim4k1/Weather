import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { gap } from "../../../styles/mixins";
import mapDate from "../../../utils/mapDate";

const Element = styled(NavLink)`
  width: calc(100% / 5);
  min-width: 110px;
  min-height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${gap("5px")}
  background: var(--color-white);
  border-radius: 10px;
  box-shadow: 0 0 8px var(--color-white-shadow);
  color: var(--color-black);
  transition: transform 0.3s;
  @media screen and (min-width: 600px){
    &:hover{
      transform: translateY(-5px);
    }
  }
`;
const ElementDayOfWeek = styled.h6`
  font-size: 13px;
  font-weight: 600;
`;
const ElementImage = styled.img`
  width: 50px;
  height: 50px;
  margin: -5px 0;
  border-radius: 50%;
`;
const ElementTemp = styled.div`
  font-size: 14px;
`;
const ElementWeather = styled.p`
  margin: auto 0;
  color: var(--color-text-gray);
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  &:first-letter{
    text-transform: uppercase;
  }
`;

function WeekWeatherListElement ({link, day, image, temp, weather}) {
  return(
    <Element to={link}>
      <ElementDayOfWeek>{mapDate(day)}</ElementDayOfWeek>
      <ElementImage src={image} alt="" />
      <ElementTemp>{temp}</ElementTemp>
      <ElementWeather>{weather}</ElementWeather>
    </Element>
  );
}

export default WeekWeatherListElement;