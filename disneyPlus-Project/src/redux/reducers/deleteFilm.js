import { SET_DELETE } from "../action";

const initialState = {
  remove: [],
};

const removeFilmReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_DELETE: {
      return {
        ...state,
        remove: action.payload,
      };
    }
    default:
      return state;
  }
};

export default removeFilmReducers;
