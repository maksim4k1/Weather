import { FAILING, LOADING, SEARCH_CITY_FAILING, SEARCH_CITY_LOADING, SEARCH_CITY_SUCCESS, SUCCESS } from "../types";
import stateCreator from "../../utils/stateCreator";

const initialState = {
  cityName: "Бишкек",
  cityNameState: stateCreator(LOADING),
};

const searchFormReducer = (state=initialState, {type, payload}) => {
  if(type === SEARCH_CITY_SUCCESS){
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

export default searchFormReducer;