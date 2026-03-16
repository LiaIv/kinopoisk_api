import { Typography, Box, Alert, Pagination } from '@mui/material';
import { useTopMovies } from '../../hooks/useTopMovies';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieCardSkeleton from '../../components/MovieCardSkeleton/MovieCardSkeleton';
import { getMovieId } from '../../utils/movieAdapter';
import './MoviesPage.css';

function MoviesPage() {
  const { movies, loading, error, page, setPage, totalPages } = useTopMovies();

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
              <MovieCard key={getMovieId(movie)} movie={movie} />
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
