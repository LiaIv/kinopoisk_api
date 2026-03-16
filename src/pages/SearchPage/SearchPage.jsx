import { useState } from 'react';
import {
  Typography,
  Box,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import { searchMovies } from '../../api/kinopoiskApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import './SearchPage.css';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim().length < 2) {
      setMovies([]);
      setSearched(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchMovies(value);
      setMovies(data.films || []);
      setSearched(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
          <MovieCard
            key={movie.kinopoiskId || movie.filmId}
            movie={movie}
          />
        ))}
      </Box>
    </Box>
  );
}

export default SearchPage;
