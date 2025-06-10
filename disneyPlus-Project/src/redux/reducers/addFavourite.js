import { ADD_FILM, REMOVE_FILM } from "../action";

const initialState = {
  list: [],
};

const favouritesReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILM: {
      const exists = state.list.some((movie) => movie.id === action.payload.id);

      if (exists) {
        return state;
      }

      const updatedList = [...state.list, action.payload];

      return {
        ...state,
        list: updatedList,
      };
    }
    case REMOVE_FILM: {
      return {
        ...state,
        list: state.list.filter((movie) => movie.id !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default favouritesReducers;
