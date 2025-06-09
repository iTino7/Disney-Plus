export const SET_FILM = "SET_FILM";
export const ADD_FILM = "ADD_FILM";
export const TOGGLE_FILM = "TOGGLE_FILM";
export const SET_SERIE = "SET_SERIE";
export const SET_ORIGINALS = "SET_ORIGINALS";

export const toggleButton = (value) => ({
  type: TOGGLE_FILM,
  payload: value,
});

export const addFavourite = (add) => ({
  type: ADD_FILM,
  payload: add,
});

export const filmFetch = (url, token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: SET_FILM, payload: data });
      } else {
        throw new Error("errore nella fetch");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const seriesFetch = (url, token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: SET_SERIE, payload: data });
      } else {
        throw new Error("errore nella fetch");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const originalsFetch = (url, token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: SET_ORIGINALS, payload: data });
      } else {
        throw new Error("errore nella fetch");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
