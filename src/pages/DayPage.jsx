import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WeekWeather from "../components/WeekWeather";
import Content from "../components/UI/Content";
import { connect } from "react-redux";
import { getDaysWeatherAction } from "../redux/actions/weatherActions";
import DayWeatherList from "../components/UI/DayWeatherList";
import DayWeatherListElement from "../components/UI/DayWeatherListElement";
import mapDate from "../utils/mapDate";
import styled from "styled-components";
import { gap } from "../styles/mixins";
import AnotherInfoList from "../components/UI/AnotherInfoList";
import AnotherInfoListElement from "../components/UI/AnotherInfoListElement";

const MainInfo = styled.div`
  padding: 20px 0 0;
  display: flex;
  flex-flow: column;
  ${gap("10px")}
`;
const Title = styled.h3`
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  color: var(--color-text-gray);
  font-size: 14px;
  &>div{
    text-transform: lowercase;
    &:first-letter{
      text-transform: uppercase;
    }
    &>span:first-child{
      text-transform: uppercase;
    }
    &>span:last-child{
      color: var(--color-black);
      font-size: 24px;
      font-weight: 600;
      text-transform: capitalize;
    }
  }
  @media screen and (max-width: 400px){
    &{
      padding: 0 15px;
    }  
  }
`;

function DayPage ({city, mainDaysWeather, daysWeather, getDaysWeatherMain}) {
  const {id} = useParams();
  const [weather, setWeather] = useState({});
  const [mainWeather, setMainWeather] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if(Number(id) > 4 || (typeof(id) === "string" && !(Number(id)+1))){
      navigate("/error/404");
    }
    getDaysWeatherMain(city);
  }, [getDaysWeatherMain, city, navigate, id]);
  useEffect(() => {
    setWeather(daysWeather[id]);
    setMainWeather(mainDaysWeather[id]);
  }, [setWeather, setMainWeather, daysWeather, mainDaysWeather, id]);

  return(
    <Content>
      <MainInfo>
        <Title><div>{mainWeather ? `${mainWeather.city}` : ""}, <span>{mainWeather ? `${mainWeather.country}` : ""}</span><br/><span>{mapDate(Number(id))}</span></div></Title>
        <DayWeatherList>
          {
            weather && weather.length ?
            weather.map((item, index) => (
              <DayWeatherListElement key={index} time={item.time} temp={item.temp} weatherIcon={`http://openweathermap.org/img/wn/${item.weatherIcon}@2x.png`} />
            ))
            : "Загрузка..."
          }
        </DayWeatherList>
        <AnotherInfoList>
          <AnotherInfoListElement title="Давление" value={mainWeather ? `${mainWeather.pressure} мм рт. ст.` : "Загрузка..."} />
          <AnotherInfoListElement title="Влажность" value={mainWeather ? `${mainWeather.humidity} %` : "Загрузка..."} />
          <AnotherInfoListElement title="Скорость ветра" value={mainWeather ? `${mainWeather.windSpeed} м/с` : "Загрузка..."} />
        </AnotherInfoList>
      </MainInfo>
      <WeekWeather weather={mainDaysWeather}/>
    </Content>
  );
}

const mapStateToProps = (state) => ({
  city: state.city,
  mainDaysWeather: state.weather.mainDaysWeather,
  daysWeather: state.weather.daysWeather,
});
const mapDispatchToProps = {
  getDaysWeatherMain: getDaysWeatherAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(DayPage);