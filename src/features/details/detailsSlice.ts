import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "64405bd2";

export interface MovieDetails {
  Title: string;
  Year: string;
  Genre: string;
  Runtime: string;
  Director: string;
  Actors: string;
  Poster: string;
  imdbRating: string;
}

interface DetailsState {
  movie: MovieDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: DetailsState = {
  movie: null,
  loading: false,
  error: null,
};

export const fetchMovieById = createAsyncThunk(
  "details/fetchMovieById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
      );
      if (response.data.Response === "False") {
        return rejectWithValue(response.data.Error);
      }
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.movie = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default detailsSlice.reducer;
