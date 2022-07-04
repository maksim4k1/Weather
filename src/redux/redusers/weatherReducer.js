import filterDayData from "../../utils/filterDayData";
import stateCreator from "../../utils/stateCreator";
import { GET_NOW_WEATHER_SUCCESS, GET_DAYS_WETHER_MAIN_SUCCESS, GET_DAYS_WETHER_SUCCESS, SUCCESS, LOADING, GET_NOW_WEATHER_LOADING, GET_NOW_WEATHER_FAILING, GET_DAYS_WETHER_MAIN_LOADING, FAILING, GET_DAYS_WETHER_MAIN_FAILING, GET_DAYS_WETHER_LOADING, GET_DAYS_WETHER_FAILING } from "../types";

const initialState = {
  nowWeather: {},
  nowWeatherState: stateCreator(SUCCESS),
  mainDaysWeather: {},
  mainDaysWeatherState: stateCreator(SUCCESS),
  daysWeather: [],
  daysWeatherState: stateCreator(SUCCESS),
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
  if(type === GET_NOW_WEATHER_SUCCESS){
    return payload ? {
      ...state,
      nowWeather: payload
    } : state;
  } else if(type === GET_NOW_WEATHER_LOADING){
    return {
      ...state,
      nowWeatherState: stateCreator(LOADING)
    }
  } else if(type === GET_NOW_WEATHER_FAILING){
    return {
      ...state,
      nowWeatherState: stateCreator(FAILING, "Ошибка запроса")
    }
  } else if(type === GET_DAYS_WETHER_MAIN_SUCCESS){
    const data = mapData(payload).map((item) => item.main);
    
    return payload ? {
      ...state,
      mainDaysWeather: data
    } : state;
  } else if(type === GET_DAYS_WETHER_MAIN_LOADING){
    return {
      ...state,
      mainDaysWeatherState: stateCreator(LOADING)
    }
  } else if(type === GET_DAYS_WETHER_MAIN_FAILING){
    return {
      ...state,
      mainDaysWeatherState: stateCreator(FAILING, "Ошибка запроса")
    }
  } else if(type === GET_DAYS_WETHER_SUCCESS){
    const data = mapData(payload).map((item) => item.list);

    return payload ? {
      ...state,
      daysWeather: data
    } : state;
  } else if(type === GET_DAYS_WETHER_LOADING){
    return {
      ...state,
      daysWeatherState: stateCreator(LOADING)
    }
  } else if(type === GET_DAYS_WETHER_FAILING){
    return {
      ...state,
      daysWeatherState: stateCreator(FAILING, "Ошибка запроса")
    }
  } else{
    return state;
  }
}

export default weatherReducer;