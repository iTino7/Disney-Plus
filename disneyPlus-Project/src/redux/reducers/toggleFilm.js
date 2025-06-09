import { TOGGLE_FILM } from "../action";

const initialState = {
  show: false,
};

export const toggleReducers = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FILM: {
      return {
        ...state,
        show: action.payload,
      };
    }
    default:
      return state;
  }
};

export default toggleReducers;
