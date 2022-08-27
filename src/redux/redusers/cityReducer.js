import { FAILING, LOADING, SEARCH_CITY_FAILING, SEARCH_CITY_LOADING, SEARCH_CITY_SUCCESS, SUCCESS, SAVE_CITY_LOADING, SAVE_CITY_SUCCESS, SAVE_CITY_FAILING } from "../types";
import stateCreator from "../../utils/stateCreator";

const cityName = localStorage.getItem("savedCityName") || "Москва";

const initialState = {
  cityName: cityName,
  savedCityName: cityName,
  cityNameState: stateCreator(SUCCESS),
  savedCityNameState: stateCreator(SUCCESS),
};

const cityReducer = (state=initialState, {type, payload}) => {
  if(type === SAVE_CITY_SUCCESS){
    return payload ? {
      ...state,
      savedCityName: payload,
      savedCityNameState: stateCreator(SUCCESS),
    } : state;
  } else if(type === SAVE_CITY_LOADING){
    return {
      ...state,
      savedCityNameState: stateCreator(LOADING),
    }
  } else if(type === SAVE_CITY_FAILING){
    return {
      ...state,
      savedCityNameState: stateCreator(FAILING, "Название города введено не верно"),
    }
  } else if(type === SEARCH_CITY_SUCCESS){
    return payload ? {
      ...state,
      cityName: payload,
      cityNameState: stateCreator(SUCCESS),
    } : state;
  } else if(type === SEARCH_CITY_LOADING){
    return {
      ...state,
      cityNameState: stateCreator(LOADING),
    }
  } else if(type === SEARCH_CITY_FAILING){
    return {
      ...state,
      cityNameState: stateCreator(FAILING, "Название города введено не верно"),
    }
  } else{
    return state;
  }
};

export default cityReducer;