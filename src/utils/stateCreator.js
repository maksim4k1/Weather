import { FAILING, LOADING, SUCCESS } from "../redux/types";

const stateCreator = (type, error) => {
  switch(type){
    case SUCCESS: {
      return {
        success: true,
        loading: false,
        failing: false,
        error: "",
      }
    } case LOADING: {
      return {
        success: false,
        loading: true,
        failing: false,
        error: "",
      }
    } case FAILING: {
      return {
        success: false,
        loading: false,
        failing: true,
        error: error,
      }
    } default: {
      return {
        success: false,
        loading: false,
        failing: false,
        error: ""
      }
    }
  }
}

export default stateCreator;