import { ADD_FILM } from "../action";

const initialState = {
  list: JSON.parse(localStorage.getItem("myList")) || [],
};

const favouritesReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILM: {
      const exists = state.list.some((movie) => movie.id === action.payload.id);

      if (exists) {
        return state;
      }

      const updatedList = [...state.list, action.payload];
      localStorage.setItem("myList", JSON.stringify(updatedList));

      return {
        ...state,
        list: updatedList,
      };
    }

    default:
      return state;
  }
};

export default favouritesReducers;
