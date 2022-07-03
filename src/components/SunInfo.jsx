import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SunInfoElement = styled.div`
  height: 100%;
  position: relative;
  font-size: 12px;
  font-weight: 600;
  z-index: 10;
  &::before{
    content: "Восход";
    width: 45px;
    position: absolute;
    bottom: 20px;
    left: -55px;
    text-align: end;
  }
  &::after{
    content: "Закат";
    width: 45px;
    position: absolute;
    bottom: 20px;
    right: -55px;
  }
`;
const SunLine = styled.div`
  width: 200px;
  height: 45px;
  display: flex;
  justify-content: center;
  position: relative;
  &::before{
    content: "";
    width: 200px;
    height: 200px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='white' stroke-width='4' stroke-dasharray='9%2c 9%2c 9' stroke-dashoffset='5' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 50%;
  }
`;
const Sun = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  position: relative;
  &::before{
    content: "";
    width: 25px;
    height: 25px;
    display: block;
    position: absolute;
    top: -11.5px;
    background: #ec6e4c;
    border-radius: 50%;
  }
  &::after{
    content: "";
    width: 25px;
    height: 25px;
    display: block;
    position: absolute;
    bottom: -11.5px;
    background: #48484a;
    border-radius: 50%;
  }
`;
const SunRise = styled.div`
  width: 45px;
  font-size: 14px;
  font-weight: 600;
  position: absolute;
  bottom: 0;
  left: -55px;
  text-align: end;
`;
const SunSet = styled(SunRise)`
  left: auto;
  right: -55px;
  text-align: start;
`;

function SunInfo ({weather, sunrise, sunset}) {
  const [rotate, setRorate] = useState(0);
  
  useEffect(() => {
    let deg, time, rotate = 0;
    if(weather.sys){
      deg = weather.sys.sunrise < weather.dt ? Math.round((weather.sys.sunset - weather.sys.sunrise) / 180) : Math.round((86400 - (weather.sys.sunset - weather.sys.sunrise)) / 180);
      time = weather.sys.sunrise < weather.dt ? ((weather.dt - weather.sys.sunrise) - (weather.sys.sunset - weather.sys.sunrise)) : (weather.sys.sunrise - weather.dt);
      rotate = weather.sys.sunrise < weather.dt ? Math.round((time / deg) + 90) : Math.round(360-(time / deg) - 90);
    }
    setRorate(rotate);
  }, [setRorate, weather]);

  return(
    <SunInfoElement>
      <SunRise>{sunrise}</SunRise>
      <SunLine><Sun style={{transform: `rotate(${rotate}deg)`}}></Sun></SunLine>
      <SunSet>{sunset}</SunSet>
    </SunInfoElement>
  );
}

export default SunInfo;