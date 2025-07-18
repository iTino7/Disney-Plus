export const SET_FILM = "SET_FILM";
export const ADD_FILM = "ADD_FILM";
export const REMOVE_FILM = "REMOVE_FILM";
export const TOGGLE_FILM = "TOGGLE_FILM";
export const SET_SERIE = "SET_SERIE";
export const SET_ORIGINALS = "SET_ORIGINALS";
export const SET_SPIDERMAN = "SET_SPIDERMAN";
export const SET_IRONMAN = "SET_IRONMAN";
export const SET_CAPAMERICA = "SET_CAPAMERICA";
export const SET_TRAILER = "SET_TRAILER";
export const SET_DELETE = "SET_DELETE";
export const SET_HOMEFILM = "SET_HOMEFILM";
export const SET_PUT = "SET_PUT";
export const SET_LOADING = "SET_LOADING";
export const SET_FIND = "SET_FIND";

export const setLoading = (value) => ({
  type: SET_LOADING,
  payload: value,
});
export const setDelete = (id) => ({
  type: SET_DELETE,
  payload: id,
});

export const toggleButton = (value) => ({
  type: TOGGLE_FILM,
  payload: value,
});

export const addFavourite = (add) => ({
  type: ADD_FILM,
  payload: add,
});

export const removeFavourite = (remove) => ({
  type: REMOVE_FILM,
  payload: remove,
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

export const searchFetch = (nameMovie, token, character) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${nameMovie}&language=it-IT&page=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: character, payload: data });
      } else {
        throw new Error("errore nella fetch");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const trailerFetch = (token, id, genre) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(
        `https://api.themoviedb.org/3/${genre}/${id}/videos?language=it-IT`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: SET_TRAILER, payload: data });
      } else {
        throw new Error("errore nella fetch");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const homeFilmFetch = (url) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(url);
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: SET_HOMEFILM, payload: data });
      }
    } catch (error) {
      console.log("Errore nella fetch dei film:", error);
    }
  };
};

export const deleteFilmFetch = (url, id) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (resp.ok) {
        dispatch(homeFilmFetch(url));
      }
    } catch (error) {
      console.log("Errore durante la DELETE:", error);
    }
  };
};

export const putFilmFetch = (url, id, updateData) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      if (resp.ok) {
        const updatedFilm = await resp.json();
        dispatch({ type: SET_PUT, payload: updatedFilm });
        dispatch(homeFilmFetch(url));
      } else {
        throw new Error("Errore nella PUT");
      }
      if (resp.ok) {
        dispatch(homeFilmFetch(url));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const findFilmFetch = (token, value) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${value}&language=it-IT`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: SET_FIND, payload: data });
      } else {
        throw new Error("errore nella fetch");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
