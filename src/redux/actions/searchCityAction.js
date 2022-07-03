import { SEARCH_CITY } from "../types";

export function searchCityAction(data){
  return {type: SEARCH_CITY, payload: data.city};
}