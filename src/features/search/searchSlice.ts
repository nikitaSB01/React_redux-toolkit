import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "64405bd2";

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface SearchState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  movies: [],
  loading: false,
  error: null,
};

// Асинхронный thunk
export const fetchMovies = createAsyncThunk(
  "search/fetchMovies",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=movie`
      );
      if (response.data.Response === "False") {
        return rejectWithValue(response.data.Error);
      }
      return response.data.Search;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Неизвестная ошибка");
      }
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearMovies(state) {
      state.movies = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMovies } = searchSlice.actions;
export default searchSlice.reducer;
