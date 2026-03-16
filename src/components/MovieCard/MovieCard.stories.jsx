import { MemoryRouter } from 'react-router-dom';
import MovieCard from './MovieCard';

export default {
  title: 'UI-kit/MovieCard',
  component: MovieCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Default = {
  args: {
    movie: {
      kinopoiskId: 1,
      nameRu: 'Форсаж',
      year: 2001,
      posterUrlPreview:
        'https://kinopoiskapiunofficial.tech/images/posters/kp_small/32898.jpg',
    },
  },
};

export const WithoutYear = {
  args: {
    movie: {
      kinopoiskId: 2,
      nameRu: 'Неизвестный фильм',
      posterUrlPreview:
        'https://kinopoiskapiunofficial.tech/images/posters/kp_small/32898.jpg',
    },
  },
};

export const EnglishTitle = {
  args: {
    movie: {
      kinopoiskId: 3,
      nameEn: 'The Matrix',
      year: 1999,
      posterUrlPreview:
        'https://kinopoiskapiunofficial.tech/images/posters/kp_small/301.jpg',
    },
  },
};
