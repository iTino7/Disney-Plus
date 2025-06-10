import { configureStore } from "@reduxjs/toolkit";
import filmReducers from "../reducers/getFilm";
import favouritesReducers from "../reducers/addFavourite";
import toggleReducers from "../reducers/toggleFilm";
import seriesReducers from "../reducers/getSeries";
import originalsReducers from "../reducers/getOriginals";
import searchReducers from "../reducers/getSearch";

const rootReducers = {
  movies: filmReducers,
  add: favouritesReducers,
  toggle: toggleReducers,
  series: seriesReducers,
  trend: originalsReducers,
  search: searchReducers,
};

const store = configureStore({
  reducer: rootReducers,
});

export default store;
