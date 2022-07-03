import { combineReducers } from "redux";
import weatherReducer from "./weatherReducer";
import cityReducer from "./cityReducer";

const rootReducer = combineReducers({
  weather: weatherReducer,
  city: cityReducer,
});

export default rootReducer;