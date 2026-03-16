import { getMovieById } from '../api/kinopoiskApi';
import { getMovieId, getMovieRating } from '../utils/movieAdapter';

export const enrichMoviesWithRatings = async (movies, options = {}) => {
  const promises = movies.map(async (movie) => {
    if (getMovieRating(movie)) {
      return movie;
    }

    const id = getMovieId(movie);

    if (!id) {
      return movie;
    }

    try {
      const details = await getMovieById(id, options);
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
