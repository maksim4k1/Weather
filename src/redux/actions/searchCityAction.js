import { SEARCH_CITY_SUCCESS } from "../types";

export function searchCityAction(data){
  return {type: SEARCH_CITY_SUCCESS, payload: data};
}