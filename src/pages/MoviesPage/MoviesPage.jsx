import { useState, useEffect } from 'react';
import { Typography, Box, Alert, Pagination } from '@mui/material';
import { getTopMovies, enrichMoviesWithRatings } from '../../api/kinopoiskApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieCardSkeleton from '../../components/MovieCardSkeleton/MovieCardSkeleton';
import './MoviesPage.css';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTopMovies(page);
        setMovies(data.items || []);
        setTotalPages(data.totalPages || 1);

        const enriched = await enrichMoviesWithRatings(data.items || []);
        setMovies(enriched);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const handlePageChange = (_, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Список новых фильмов
      </Typography>
      <Box className="movies-page__grid">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))
          : movies.map((movie) => (
              <MovieCard
                key={movie.kinopoiskId || movie.filmId}
                movie={movie}
              />
            ))}
      </Box>
      {!loading && totalPages > 1 && (
        <Box className="movies-page__pagination">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Box>
  );
}

export default MoviesPage;
