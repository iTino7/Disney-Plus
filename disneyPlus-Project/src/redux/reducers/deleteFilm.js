import { SET_DELETE } from "../action";

const initialState = {
  remove: [],
};

const removeFilmReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_DELETE: {
      return {
        ...state,
        remove: state.film.filter((movie) => movie.id !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default removeFilmReducers;
