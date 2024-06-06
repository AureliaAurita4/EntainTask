import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { MovieState } from '../interfaces/movieState';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: null,
  searchQuery: '',
  currentPage: 1,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ searchQuery, page }: { searchQuery: string; page: number }) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${searchQuery}&page=${page}&apikey=${API_KEY}`
    );
    console.log('response: ', response);
    return response.data.Search;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (id: string) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
    );
    
    return response.data;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.movies = action.payload;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch movies';
    });
    builder.addCase(fetchMovieDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedMovie = action.payload;
    });
    builder.addCase(fetchMovieDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch movie details';
    });
  },
});

export const { setSearchQuery, setCurrentPage } = movieSlice.actions;

export default movieSlice.reducer;
