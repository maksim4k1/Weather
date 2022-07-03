import React from "react";
import styled from "styled-components";
import { gap } from "../styles/mixins";
import WeekWeatherList from "./UI/WeekWeatherList";
import WeekWeatherListElement from "./UI/WeekWeatherListElement";

const Container = styled.div`
  padding: 0 0 30px;
  display: flex;
  flex-flow: column;
  ${gap("15px;")}
`;
const Title = styled.h3`
  padding: 0 30px;
  font-size: 24px;
  font-weight: 600;
  @media screen and (max-width: 400px){
    &{
      padding: 0 15px;
    }
  }
`;

function WeekWeather ({weather}) {
  return(
    <Container>
      <Title>Погода на 5 дней</Title>
      <WeekWeatherList>
        {
          weather.length ?
          weather.map((item, index) => (
            <WeekWeatherListElement
              key={index}
              id={index}
              day={index}
              image={`http://openweathermap.org/img/wn/${item.weatherIcon}@2x.png`}
              temp={`${item.maxTemp} c° / ${item.minTemp} c°`}
              weather={item.weather}
            />
          ))
          : "Загрузка..."
        }
      </WeekWeatherList>
    </Container>
  );
}

export default WeekWeather;