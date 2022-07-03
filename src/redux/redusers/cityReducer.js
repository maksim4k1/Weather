import { SEARCH_CITY } from "../types";

const initialState = "Бишкек";

const searchFormReducer = (state=initialState, {type, payload}) => {
  if(type === SEARCH_CITY){
    return payload ? payload : state;
  } else{
    return state;
  }
};

export default searchFormReducer;