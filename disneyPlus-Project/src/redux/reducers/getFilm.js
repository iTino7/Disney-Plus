import { SET_FILM } from "../action";

const initialState = {
  film: [],
};

const filmReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILM: {
      return {
        ...state,
        film: action.payload,
      };
    }
    default:
      return state;
  }
};

export default filmReducers;
