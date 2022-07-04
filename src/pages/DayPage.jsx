import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import WeekWeather from "../components/WeekWeather";
import Content from "../components/UI/Content";
import { connect } from "react-redux";
import { getDaysWeatherAction, getNowWeatherAction } from "../redux/actions/weatherActions";
import DayWeatherList from "../components/UI/DayWeatherList";
import DayWeatherListElement from "../components/UI/DayWeatherListElement";
import mapDate from "../utils/mapDate";
import styled from "styled-components";
import { gap } from "../styles/mixins";
import AnotherInfoList from "../components/UI/AnotherInfoList";
import AnotherInfoListElement from "../components/UI/AnotherInfoListElement";
import day from "../assets/day.webp";
import night from "../assets/night.webp";

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
const NowWeatherInfo = styled.div`
  padding: 20px 0 15px;
  display: flex;
  align-items: center;
  flex-flow: column;
  ${gap("10px")}
  position: relative;
  color: var(--color-white);
  background-image: url(${day});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  &::before, &::after{
    content: "";
    width: 100%;
    height: 100px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%);
  }
  &::before{
    top: 0;
    bottom: auto;
    background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%);
  }
  @media screen and (max-width: 600px){
    &{
      padding: 20px 0;
      height: auto;
    }
  }
`;
const NowWeatherInfoTitle = styled.h3`
  height: 20px;
  font-weight: 600;
  z-index: 10;
`;
const NowWeatherInfoTemp = styled.h2`
  margin: 0;
  font-size: 78px;
  font-weight: 600;
`;
const NowWeatherInfoWeather = styled.h3`
  margin: 0 0 10px;
  font-size: 24px;
  z-index: 10;
  &:first-letter{
    text-transform: uppercase;
  }
`;
const NowWeatherInfoLink = styled(NavLink)`
  padding: 7px 10px;
  color: var(--color-white);
  border-radius: 10px;
  background: var(--color-blue);
  z-index: 10;
`;

function DayPage ({city, nowWeather, mainDaysWeather, daysWeather, getNowWeather, getDaysWeatherMain}) {
  const {id} = useParams();
  const [weather, setWeather] = useState({});
  const [mainWeather, setMainWeather] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if(Number(id) > 4 || (typeof(id) === "string" && !(Number(id)+1))){
      navigate("/error/404");
    }
    getDaysWeatherMain(city);
    getNowWeather(city);
  }, [getDaysWeatherMain, getNowWeather, city, navigate, id]);
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
      <NowWeatherInfo style={(nowWeather.sys && ((nowWeather.sys.sunset > nowWeather.dt) && (nowWeather.sys.sunrise < nowWeather.dt))) ? {} : {backgroundImage: `url(${night})`}}>
        <NowWeatherInfoTitle>Погода сейчас</NowWeatherInfoTitle>
        <NowWeatherInfoTemp>{nowWeather.main ? `${Math.round(nowWeather.main.temp - 273.15)} c°` : "0 c°"}</NowWeatherInfoTemp>
        <NowWeatherInfoWeather>{nowWeather.weather ? nowWeather.weather[0].description : "Загрузка..."}</NowWeatherInfoWeather>
        <NowWeatherInfoLink to="/">Подробнее</NowWeatherInfoLink>
      </NowWeatherInfo>
      <WeekWeather weather={mainDaysWeather}/>
    </Content>
  );
}

const mapStateToProps = (state) => ({
  city: state.city.cityName,
  nowWeather: state.weather.nowWeather,
  mainDaysWeather: state.weather.mainDaysWeather,
  daysWeather: state.weather.daysWeather,
});
const mapDispatchToProps = {
  getNowWeather: getNowWeatherAction,
  getDaysWeatherMain: getDaysWeatherAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(DayPage);