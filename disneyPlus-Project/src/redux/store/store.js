import { configureStore } from "@reduxjs/toolkit";
import filmReducers from "../reducers/getFilm";
import favouritesReducers from "../reducers/addFavourite";
import toggleReducers from "../reducers/toggleFilm";
import seriesReducers from "../reducers/getSeries";
import originalsReducers from "../reducers/getOriginals";
import searchReducers from "../reducers/getSearch";
import trailerReducers from "../reducers/getTrailer";
import removeFilmReducers from "../reducers/deleteFilm";
import filmHomeReducers from "../reducers/getHomeFilm";
import putReducers from "../reducers/putFilm";
import findFilmReducers from "../reducers/getFindFilm";

const rootReducers = {
  movies: filmReducers,
  add: favouritesReducers,
  toggle: toggleReducers,
  series: seriesReducers,
  trend: originalsReducers,
  search: searchReducers,
  trailer: trailerReducers,
  remove: removeFilmReducers,
  home: filmHomeReducers,
  put: putReducers,
  find: findFilmReducers,
};

const store = configureStore({
  reducer: rootReducers,
});

export default store;
