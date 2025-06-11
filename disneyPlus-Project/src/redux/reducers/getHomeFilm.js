import { SET_HOMEFILM } from "../action";

const initialState = {
  film: [],
};

const filmHomeReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOMEFILM: {
      return {
        ...state,
        film: action.payload,
      };
    }
    default:
      return state;
  }
};

export default filmHomeReducers;
