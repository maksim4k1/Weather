import { GET_NOW_WEATHER_SUCCESS, GET_DAYS_WETHER_MAIN_SUCCESS, GET_DAYS_WETHER_SUCCESS, SEARCH_CITY_FAILING, SEARCH_CITY_LOADING, GET_NOW_WEATHER_LOADING, GET_DAYS_WETHER_MAIN_LOADING, GET_DAYS_WETHER_LOADING, GET_DAYS_WETHER_MAIN_FAILING, GET_DAYS_WETHER_FAILING, GET_NOW_WEATHER_FAILING } from "../types";
import { searchCityAction } from "./searchCityAction";

const API_KEY = "11c5bb34404731231ac094ed2f7c612f"

export function getNowWeatherAction(city){
  return async (dispatch) => {
    dispatch({type: SEARCH_CITY_LOADING});
    dispatch({type: GET_NOW_WEATHER_LOADING});

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=ru`);
    const data = response.ok ? await response.json() : "";

    if(data){
      dispatch({type: GET_NOW_WEATHER_SUCCESS, payload: data});
      searchCityAction(data.name);
    } else{
      dispatch({type: SEARCH_CITY_FAILING});
      dispatch({type: GET_NOW_WEATHER_FAILING});
    }
  }
}
export function getDaysWeatherAction(city){
  return async (dispatch) => {
    dispatch({type: SEARCH_CITY_LOADING});
    dispatch({type: GET_DAYS_WETHER_MAIN_LOADING});
    dispatch({type: GET_DAYS_WETHER_LOADING});

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&lang=ru`);
    const data = response.ok ? await response.json() : "";

    if(data){
      dispatch({type: GET_DAYS_WETHER_MAIN_SUCCESS, payload: data});
      dispatch({type: GET_DAYS_WETHER_SUCCESS, payload: data});
      searchCityAction(data.city.name);
    } else{
      dispatch({type: SEARCH_CITY_FAILING});
      dispatch({type: GET_DAYS_WETHER_MAIN_FAILING});
      dispatch({type: GET_DAYS_WETHER_FAILING});
    }
  }
}