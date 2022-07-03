import filterDayData from "../../utils/filterDayData";
import { GET_NOW_WEATHER, GET_DAYS_WETHER_MAIN, GET_DAYS_WETHER } from "../types";

const initialState = {
  nowWeather: {},
  mainDaysWeather: {},
  daysWeather: [],
};

function mapData(data){
  const days = [];
  const daysData = [];

  if(data){
    for(let i = 0; i < data.list.length; i++){
      const value = data.list[i];
      let date = value.dt_txt.split(" ")[0].split("-")[2];
      if(!days.find((i) => i === date)){
        days.push(date);
        daysData.push(filterDayData(date, data.list, data.city.name, data.city.country));
      }
      if(days.length === 5) break;
    }
  }

  return daysData;
}

const weatherReducer = (state=initialState, {type, payload}) => {
  if(type === GET_NOW_WEATHER){
    return payload ? {
      ...state,
      nowWeather: payload
    } : state;
  } else if(type === GET_DAYS_WETHER_MAIN){
    const data = mapData(payload).map((item) => item.main);
    
    return payload ? {
      ...state,
      mainDaysWeather: data
    } : state;
  } else if(type === GET_DAYS_WETHER){
    const data = mapData(payload).map((item) => item.list);

    return payload ? {
      ...state,
      daysWeather: data
    } : state;
  } else{
    return state;
  }
}

export default weatherReducer;