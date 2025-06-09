import { SET_SERIE } from "../action";

const initialState = {
  series: [],
};

const seriesReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_SERIE: {
      return {
        ...state,
        series: action.payload,
      };
    }
    default:
      return state;
  }
};

export default seriesReducers;
