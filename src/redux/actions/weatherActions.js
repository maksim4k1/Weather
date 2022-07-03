import { GET_NOW_WEATHER, GET_DAYS_WETHER_MAIN, GET_DAYS_WETHER } from "../types";

const API_KEY = "11c5bb34404731231ac094ed2f7c612f"

export function getNowWeatherAction(city){
  return async (dispatch) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=ru`);
    const data = response.ok ? await response.json() : "";

    dispatch({type: GET_NOW_WEATHER, payload: data ? data : ""});
  }
}
export function getDaysWeatherAction(city){
  return async (dispatch) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&lang=ru`);
    const data = response.ok ? await response.json() : "";

    dispatch({type: GET_DAYS_WETHER_MAIN, payload: data ? data : ""});
    dispatch({type: GET_DAYS_WETHER, payload: data ? data : ""});
  }
}