import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './MovieSlice';

const store = configureStore({
  reducer: {
    movies: moviesSlice,
  },
});

export default store;