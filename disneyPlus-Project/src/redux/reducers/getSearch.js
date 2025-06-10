import { SET_SPIDERMAN, SET_IRONMAN, SET_CAPAMERICA } from "../action";

const initialState = {
  spiderman: [],
  ironMan: [],
  capAmerica: [],
};

const searchReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPIDERMAN: {
      return {
        ...state,
        spiderman: action.payload,
      };
    }
    case SET_IRONMAN: {
      return {
        ...state,
        ironMan: action.payload,
      };
    }
    case SET_CAPAMERICA: {
      return {
        ...state,
        capAmerica: action.payload,
      };
    }
    default:
      return state;
  }
};

export default searchReducers;
