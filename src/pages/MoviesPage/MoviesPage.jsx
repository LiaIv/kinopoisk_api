import { Typography, Box, Alert, Button, CircularProgress } from '@mui/material';
import { useTopMovies } from '../../hooks/useTopMovies';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieCardSkeleton from '../../components/MovieCardSkeleton/MovieCardSkeleton';
import { getMovieId } from '../../utils/movieAdapter';
import './MoviesPage.css';

function MoviesPage() {
  const {
    movies,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  } = useTopMovies();

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
        {!loading && loadingMore &&
          Array.from({ length: 4 }).map((_, i) => (
            <MovieCardSkeleton key={`loading-more-${i}`} />
          ))}
      </Box>
      {!loading && hasMore && (
        <Box className="movies-page__load-more">
          <Button
            variant="outlined"
            size="large"
            onClick={loadMore}
            disabled={loadingMore}
          >
            {loadingMore ? (
              <>
                <CircularProgress size={18} className="movies-page__spinner" />
                Загружаем...
              </>
            ) : (
              'Показать еще'
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default MoviesPage;
