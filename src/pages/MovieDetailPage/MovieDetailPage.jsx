import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Rating,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import { addFavorite, removeFavorite } from '../../store/favoritesSlice';
import {
  getMovieId,
  getMoviePoster,
  getMovieRating,
  getMovieTitle,
  getMovieYear,
  toFavoriteMovie,
} from '../../utils/movieAdapter';
import './MovieDetailPage.css';

function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const movieId = Number(id);
  const { movie, loading, error } = useMovieDetails(id);

  const isFavorite = favorites.some((item) => getMovieId(item) === movieId);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movieId));
    } else {
      dispatch(addFavorite(toFavoriteMovie(movie)));
    }
  };

  if (loading) {
    return (
      <Box className="movie-detail__loader">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!movie) {
    return <Alert severity="warning">Фильм не найден</Alert>;
  }

  const title = getMovieTitle(movie);
  const year = getMovieYear(movie);
  const poster = getMoviePoster(movie);
  const ratingValue = Number(getMovieRating(movie)) || 0;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {title} {year && `(${year})`}
      </Typography>
      <Box className="movie-detail__content">
        <img
          className="movie-detail__poster"
          src={poster}
          alt={title}
        />
        <Box className="movie-detail__info">
          <Typography variant="h6" gutterBottom>
            Описание
          </Typography>
          <Typography variant="body1" paragraph>
            {movie.description || 'Описание отсутствует'}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Рейтинг
          </Typography>
          <Rating
            value={ratingValue}
            precision={0.5}
            max={10}
            readOnly
            size="large"
          />
          <Box className="movie-detail__actions">
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              Назад
            </Button>
            <Button
              variant="outlined"
              color={isFavorite ? 'error' : 'primary'}
              startIcon={
                isFavorite ? <RemoveCircleIcon /> : <FavoriteIcon />
              }
              onClick={handleToggleFavorite}
            >
              {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<OpenInNewIcon />}
              href={`https://www.kinopoisk.ru/film/${id}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ссылка на &quot;Кинопоиск&quot;
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MovieDetailPage;
