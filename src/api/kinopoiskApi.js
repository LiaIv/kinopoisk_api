const API_KEY = '8c8e1a50-6322-4135-8875-5d40a5420d86';
const BASE_URL = 'https://kinopoiskapiunofficial.tech/api';

const headers = {
  'X-API-KEY': API_KEY,
  'Content-Type': 'application/json',
};

export const getTopMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${page}`,
    { headers },
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

export const searchMovies = async (keyword, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`,
    { headers },
  );

  if (!response.ok) {
    throw new Error('Ошибка поиска фильмов');
  }

  return response.json();
};

export const getMovieById = async (id) => {
  const response = await fetch(`${BASE_URL}/v2.2/films/${id}`, { headers });

  if (!response.ok) {
    throw new Error('Ошибка загрузки информации о фильме');
  }

  return response.json();
};

export const enrichMoviesWithRatings = async (movies) => {
  const promises = movies.map(async (movie) => {
    if (movie.rating && movie.rating !== null) {
      return movie;
    }

    const id = movie.kinopoiskId || movie.filmId;

    try {
      const details = await getMovieById(id);
      return {
        ...movie,
        rating: details.ratingKinopoisk || details.ratingImdb || null,
      };
    } catch {
      return movie;
    }
  });

  return Promise.all(promises);
};
