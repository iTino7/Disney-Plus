import { SET_FIND } from "../action";

const initialState = {
  film: [],
};

const findFilmReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIND: {
      return {
        ...state,
        film: action.payload.results,
      };
    }
    default:
      return state;
  }
};

export default findFilmReducers;
