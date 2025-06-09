import { SET_ORIGINALS } from "../action";

const initialState = {
  originals: [],
};

const originalsReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORIGINALS: {
      return {
        ...state,
        originals: action.payload,
      };
    }
    default:
      return state;
  }
};

export default originalsReducers;
