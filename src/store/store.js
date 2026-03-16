import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import { loadFavorites, saveFavorites } from './favoritesStorage';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  preloadedState: {
    favorites: {
      items: loadFavorites(),
    },
  },
});

let previousFavorites = store.getState().favorites.items;

store.subscribe(() => {
  const nextFavorites = store.getState().favorites.items;

  if (nextFavorites !== previousFavorites) {
    previousFavorites = nextFavorites;
    saveFavorites(nextFavorites);
  }
});

export default store;
