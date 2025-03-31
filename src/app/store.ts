import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import detailsReducer from "../features/details/detailsSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    favorites: favoritesReducer,
    details: detailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
