export const getMovieId = (movie) => movie?.kinopoiskId || movie?.filmId || null;

export const getMovieTitle = (movie) =>
  movie?.nameRu || movie?.nameEn || 'Без названия';

export const getMovieYear = (movie) => movie?.year || '';

export const getMoviePoster = (movie) =>
  movie?.posterUrlPreview || movie?.posterUrl || '';

export const getMovieRating = (movie) =>
  movie?.ratingKinopoisk || movie?.ratingImdb || movie?.rating || null;

export const getMovieRatingValue = (movie) => {
  const rating = getMovieRating(movie);

  if (rating === null || rating === undefined || rating === 'null') {
    return 0;
  }

  const numericRating = Number.parseFloat(String(rating).replace(',', '.'));
  return Number.isFinite(numericRating) ? numericRating : 0;
};

export const hasMovieRating = (movie) => {
  return getMovieRatingValue(movie) > 0;
};

export const normalizeMovie = (movie) => ({
  id: getMovieId(movie),
  title: getMovieTitle(movie),
  year: getMovieYear(movie),
  poster: getMoviePoster(movie),
  rating: getMovieRating(movie),
  hasRating: hasMovieRating(movie),
});

export const toFavoriteMovie = (movie) => ({
  kinopoiskId: getMovieId(movie),
  nameRu: movie?.nameRu || '',
  nameEn: movie?.nameEn || '',
  year: getMovieYear(movie),
  posterUrl: movie?.posterUrl || getMoviePoster(movie),
  posterUrlPreview: movie?.posterUrlPreview || movie?.posterUrl || '',
  ratingKinopoisk: movie?.ratingKinopoisk ?? null,
  ratingImdb: movie?.ratingImdb ?? null,
  rating: movie?.rating ?? getMovieRating(movie),
});
