import { SEARCH_CITY_SUCCESS, SAVE_CITY_SUCCESS, SAVE_CITY_LOADING, SAVE_CITY_FAILING, SEARCH_CITY_LOADING, SEARCH_CITY_FAILING } from "../types";

const API_KEY = "11c5bb34404731231ac094ed2f7c612f";

export function searchCityAction(city){
  return async (dispatch) => {
    dispatch({type: SEARCH_CITY_LOADING, payload: city});

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=ru`);
    const data = response.ok ? await response.json() : "";

    if(data){
      dispatch({type: SEARCH_CITY_SUCCESS, payload: city});
    } else{
      dispatch({type: SEARCH_CITY_FAILING});
    }
  }
}
export function saveCityAction(city){
  return async (dispatch) => {
    dispatch({type: SAVE_CITY_LOADING, payload: city});

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=ru`);
    const data = response.ok ? await response.json() : "";

    if(data){
      dispatch({type: SAVE_CITY_SUCCESS, payload: city});
      dispatch(searchCityAction(city));
      localStorage.setItem("savedCityName", city);
    } else{
      dispatch({type: SAVE_CITY_FAILING});
    }
  }
}