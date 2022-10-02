import React, { useEffect, useState } from "react";
import WeekWeather from "../components/WeekWeather";
import Content from "../components/UI/Content";
import styled from "styled-components";
import { gap } from "../styles/mixins";
import SunInfo from "../components/SunInfo";
import AnotherInfoList from "../components/UI/AnotherInfoList";
import AnotherInfoListElement from "../components/UI/AnotherInfoListElement";
import Loader from "../components/UI/Loader";
import { getNowWeatherAction, getDaysWeatherAction } from "../redux/actions/weatherActions";
import { connect } from "react-redux";
import ErrorAlert from "../components/UI/ErrorAlert";
import weatherBgChanger from "../utils/weatherBgChanger";

const Info = styled.div`
  display: flex;
  flex-flow: column;
  ${gap("20px")}
`;
const MainInfo = styled.div`
  height: 300px;
  padding: 20px 0 15px;
  display: flex;
  align-items: center;
  flex-flow: column;
  ${gap("10px")}
  position: relative;
  color: var(--color-white);
  background: var(--color-white);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 8px var(--color-white-shadow);
  overflow: hidden;
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
      height: 420px;
      &::before, &::after{
        height: 100px;
      }
    }
  }
`;
const MainInfoCityName = styled.h3`
  width: 100%;
  height: 20px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  z-index: 10;
  @media screen and (max-width: 400px){
    &{
      padding: 0 15px;
    }
  }
`;
const MainInfoTemp = styled.h2`
  margin: -20px 0 0;
  font-size: 78px;
  font-weight: 600;
  @media screen and (max-width: 600px){
    &{
      margin: 75px 0 25px;
    }
  }
`;
const MainInfoWeather = styled.h3`
  margin: 0 0 20px;
  font-size: 24px;
  text-shadow: 0 0 10px var(--color-black-shadow);
  z-index: 10;
  &:first-letter{
    text-transform: uppercase;
  }
`;

function MainPage ({nowWeather, mainDaysWeather, city, getNowWeather, getDaysWeatherMain, cityState, mainDaysWeatherState}) {
  const [bgImage, setBgImage] = useState();
  const date = new Date();
  const sunrise = nowWeather.sys ? new Date((nowWeather.sys.sunrise + (date.getTimezoneOffset()*60) + nowWeather.timezone) * 1000) : "";
  const sunset = nowWeather.sys ? new Date((nowWeather.sys.sunset + (date.getTimezoneOffset()*60) + nowWeather.timezone) * 1000) : "";

  useEffect(() => {
    getNowWeather(city);
    getDaysWeatherMain(city);
  }, [getNowWeather, getDaysWeatherMain, city]);
  useEffect(() => {
    if(nowWeather.weather && nowWeather.weather[0].icon){
      setBgImage(weatherBgChanger(nowWeather.weather[0].icon));
    }
  }, [nowWeather]);

  return(
    <Content>
      {
        !cityState.loading ?
        <>
          <Info>
            <MainInfo style={{backgroundImage: `url(${bgImage})`}}>
              <MainInfoCityName>
                {
                  nowWeather.sys ?
                  <>
                    <div>{`${nowWeather.name}, ${nowWeather.sys.country}`}</div>
                    <div>{((nowWeather.sys.sunset > nowWeather.dt) && (nowWeather.sys.sunrise < nowWeather.dt)) ? "День" : "Ночь"}</div>
                  </> :
                  "Загрузка..."
                }
              </MainInfoCityName>
              <MainInfoTemp>{nowWeather.main ? `${Math.round(nowWeather.main.temp - 273.15)} c°` : "0 c°"}</MainInfoTemp>
              <MainInfoWeather>{nowWeather.weather ? nowWeather.weather[0].description : "Загрузка..."}</MainInfoWeather>
              <SunInfo weather={nowWeather} sunrise={sunrise ? `${sunrise.getHours()}:${sunrise.getMinutes() >= 10 ? sunrise.getMinutes() : `0${sunrise.getMinutes()}`}` : "Загрузка..."} sunset={sunset ? `${sunset.getHours()}:${sunrise.getMinutes() >= 10 ? sunrise.getMinutes() : `0${sunrise.getMinutes()}`}` : "Загрузка..."} />
            </MainInfo>
            <AnotherInfoList>
              <AnotherInfoListElement title="По ощущению" value={nowWeather.main ? `${Math.floor(nowWeather.main.feels_like - 273.15)} c°` : "Загрузка..."}/>
              <AnotherInfoListElement title="Давление" value={nowWeather.main ? `${Math.floor(nowWeather.main.pressure * 0.75)} мм рт. ст.` : "Загрузка..."}/>
              <AnotherInfoListElement title="Скорость ветра" value={nowWeather.main ? `${nowWeather.wind.speed} м/с` : "Загрузка..."}/>
              <AnotherInfoListElement title="Облачность" value={nowWeather.main ? `${nowWeather.clouds.all} %` : "Загрузка..."}/>
              <AnotherInfoListElement title="Влажность" value={nowWeather.main ? `${nowWeather.main.humidity} %` : "Загрузка..."}/>
              <AnotherInfoListElement title="Видимость" value={nowWeather.main ? `${(Math.floor(nowWeather.visibility * 0.01) / 10)} км` : "Загрузка..."}/>
            </AnotherInfoList>
          </Info>
          {
            !mainDaysWeatherState.loading ?
            !mainDaysWeatherState.failing ?
            <WeekWeather weather={mainDaysWeather}/> : <ErrorAlert>{mainDaysWeatherState.error}</ErrorAlert>
            : <Loader/>
          }
        </>
        : <Loader/>
      }
    </Content>
  );
}

const mapStateToProps = (state) => ({
  nowWeather: state.weather.nowWeather,
  mainDaysWeather: state.weather.mainDaysWeather,
  mainDaysWeatherState: state.weather.mainDaysWeatherState,
  city: state.city.cityName,
  cityState: state.city.cityNameState
});
const mapDispatchToProps = {
  getNowWeather: getNowWeatherAction,
  getDaysWeatherMain: getDaysWeatherAction
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);