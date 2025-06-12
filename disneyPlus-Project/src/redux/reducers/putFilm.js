import { SET_PUT } from "../action";

const initialState = {
  list: [],
};

const putReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_PUT: {
      const updatedList = state.list.map((movie) =>
        movie.id === action.payload.id ? { ...movie, ...action.payload } : movie
      );

      return {
        ...state,
        list: updatedList,
      };
    }
    default:
      return state;
  }
};

export default putReducers;
