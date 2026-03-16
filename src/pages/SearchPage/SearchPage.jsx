import {
  Typography,
  Box,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useMovieSearch } from '../../hooks/useMovieSearch';
import MovieCard from '../../components/MovieCard/MovieCard';
import { getMovieId } from '../../utils/movieAdapter';
import './SearchPage.css';

function SearchPage() {
  const { query, setQuery, movies, loading, error, searched } =
    useMovieSearch();

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Поиск фильма
      </Typography>
      <TextField
        label="Введите название фильма"
        variant="outlined"
        value={query}
        onChange={handleSearch}
        className="search-page__input"
      />
      {loading && (
        <Box className="search-page__loader">
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {searched && movies.length === 0 && !loading && (
        <Typography sx={{ mt: 2 }}>Фильмы не найдены</Typography>
      )}
      <Box className="search-page__grid">
        {movies.map((movie) => (
          <MovieCard key={getMovieId(movie)} movie={movie} />
        ))}
      </Box>
    </Box>
  );
}

export default SearchPage;
