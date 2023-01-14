import filterDayData from "../../utils/filterDayData";
import stateCreator from "../../utils/stateCreator";
import { GET_NOW_WEATHER_SUCCESS, GET_DAYS_WETHER_MAIN_SUCCESS, GET_DAYS_WETHER_SUCCESS, SUCCESS, LOADING, GET_NOW_WEATHER_LOADING, GET_NOW_WEATHER_FAILING, GET_DAYS_WETHER_MAIN_LOADING, FAILING, GET_DAYS_WETHER_MAIN_FAILING, GET_DAYS_WETHER_LOADING, GET_DAYS_WETHER_FAILING } from "../types";

const initialState = {
  nowWeather: {},
  nowWeatherState: stateCreator(),
  mainDaysWeather: {},
  mainDaysWeatherState: stateCreator(),
  daysWeather: [],
  daysWeatherState: stateCreator(),
};

function mapData(data){
  const days = [];
  const daysData = [];

  if(data){
    for(let i = 0; i < data.list.length; i++){
      const value = data.list[i];
      let date = new Date(value.dt * 1000);
      let day = date.getDate();
      let hours = date.getHours();

      if(i === 0 && (hours === 0 || hours === 1 || hours === 2) && new Date().getDate() !== day){
        days.push(day - 1);
        console.log("jgfjhk")
        daysData.push(filterDayData(day - 1, data.list, data.city));
      } else if(!days.find((i) => i === day)){
        days.push(day);
        daysData.push(filterDayData(day, data.list, data.city));
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
      nowWeather: payload,
      nowWeatherState: stateCreator(SUCCESS)
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
      mainDaysWeather: data,
      mainDaysWeatherState: stateCreator(SUCCESS)
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
      daysWeather: data,
      daysWeatherState: stateCreator(SUCCESS)
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