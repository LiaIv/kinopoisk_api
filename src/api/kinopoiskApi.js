import { KINOPOISK_API_KEY, KINOPOISK_BASE_URL } from '../config/kinopoisk';

const headers = {
  'X-API-KEY': KINOPOISK_API_KEY,
  'Content-Type': 'application/json',
};

export const getTopMovies = async (page = 1, options = {}) => {
  const response = await fetch(
    `${KINOPOISK_BASE_URL}/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${page}`,
    { headers, ...options },
  );

  if (!response.ok) {
    throw new Error('Ошибка загрузки фильмов');
  }

  const data = await response.json();

  return {
    items: data.films || [],
    totalPages: data.pagesCount || 1,
  };
};

export const searchMovies = async (keyword, page = 1, options = {}) => {
  const response = await fetch(
    `${KINOPOISK_BASE_URL}/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`,
    { headers, ...options },
  );

  if (!response.ok) {
    throw new Error('Ошибка поиска фильмов');
  }

  return response.json();
};

export const getMovieById = async (id, options = {}) => {
  const response = await fetch(`${KINOPOISK_BASE_URL}/v2.2/films/${id}`, {
    headers,
    ...options,
  });

  if (!response.ok) {
    throw new Error('Ошибка загрузки информации о фильме');
  }

  return response.json();
};
