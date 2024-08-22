import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: [],
    counter: 0,
    error: ''
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMoviesState: (state, action) => {
            state.movies = action.payload;
        },
        getMovies: (state, action) => {
            state.movies = action.payload;
        },
        removeMovieFromList: (state, action) => {
            state.movies = state.movies.filter(item => item.id !== action.payload);
        },
        likeMovie: (state, action) => {
            const movie = state.movies.find(movie => movie.id === action.payload);
            if (movie) {
                movie.likes += 1;
            }

        },
        dislikeMovie: (state, action) => {
            const movie = state.movies.find(movie => movie.id === action.payload);
            if (movie) {
                movie.dislikes += 1;
            }
            console.log(state.movies)
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setMoviesState, removeMovieFromList, likeMovie, dislikeMovie, setError } = moviesSlice.actions;

export default moviesSlice.reducer;
