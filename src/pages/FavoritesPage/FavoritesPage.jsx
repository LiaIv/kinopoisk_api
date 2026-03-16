import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import MovieCard from '../../components/MovieCard/MovieCard';
import { getMovieId } from '../../utils/movieAdapter';
import './FavoritesPage.css';

function FavoritesPage() {
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Избранное
      </Typography>
      {favorites.length === 0 ? (
        <Typography color="text.secondary">
          Нет избранных фильмов. Добавьте фильмы в избранное на странице
          фильма.
        </Typography>
      ) : (
        <Box className="favorites-page__grid">
          {favorites.map((movie) => (
            <MovieCard key={getMovieId(movie)} movie={movie} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default FavoritesPage;
