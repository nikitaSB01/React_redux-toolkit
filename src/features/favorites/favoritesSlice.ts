import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../search/searchSlice";

interface FavoritesState {
  list: Movie[];
}

const initialState: FavoritesState = {
  list: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<Movie>) {
      const exists = state.list.find((m) => m.imdbID === action.payload.imdbID);
      if (!exists) {
        state.list.push(action.payload);
      }
    },
    removeFromFavorites(state, action: PayloadAction<string>) {
      state.list = state.list.filter((m) => m.imdbID !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
