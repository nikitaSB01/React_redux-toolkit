import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../search/searchSlice";

interface FavoritesState {
  list: Movie[];
}

const getInitialFavorites = (): Movie[] => {
  try {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: FavoritesState = {
  list: getInitialFavorites(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<Movie>) {
      const exists = state.list.find((m) => m.imdbID === action.payload.imdbID);
      if (!exists) {
        state.list.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.list));
      }
    },
    removeFromFavorites(state, action: PayloadAction<string>) {
      state.list = state.list.filter((m) => m.imdbID !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.list));
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
