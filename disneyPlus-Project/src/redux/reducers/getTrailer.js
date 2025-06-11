import { SET_TRAILER } from "../action";

const initialState = {
  trailer: [],
};

const trailerReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRAILER: {
      return {
        ...state,
        trailer: action.payload,
      };
    }
    default:
      return state;
  }
};

export default trailerReducers;
