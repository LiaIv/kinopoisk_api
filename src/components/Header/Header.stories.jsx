import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../../store/favoritesSlice';
import Header from './Header';

const createMockStore = (favoritesCount = 0) => {
  const items = Array.from({ length: favoritesCount }, (_, i) => ({
    kinopoiskId: i + 1,
    nameRu: `Фильм ${i + 1}`,
  }));

  return configureStore({
    reducer: { favorites: favoritesReducer },
    preloadedState: { favorites: { items } },
  });
};

export default {
  title: 'UI-kit/Header',
  component: Header,
  decorators: [
    (Story, context) => (
      <MemoryRouter>
        <Provider store={createMockStore(context.args.favoritesCount || 0)}>
          <Story />
        </Provider>
      </MemoryRouter>
    ),
  ],
};

export const Default = {
  args: {
    favoritesCount: 0,
  },
};

export const WithFavorites = {
  args: {
    favoritesCount: 4,
  },
};
