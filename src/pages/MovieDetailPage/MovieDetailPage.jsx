import { useState, useEffect } from 'react';
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
import { getMovieById } from '../../api/kinopoiskApi';
import { addFavorite, removeFavorite } from '../../store/favoritesSlice';
import './MovieDetailPage.css';

function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isFavorite = favorites.some(
    (item) => item.kinopoiskId === Number(id),
  );

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(Number(id)));
    } else {
      dispatch(
        addFavorite({
          kinopoiskId: movie.kinopoiskId,
          nameRu: movie.nameRu,
          nameEn: movie.nameEn,
          year: movie.year,
          posterUrl: movie.posterUrl,
          posterUrlPreview: movie.posterUrlPreview,
        }),
      );
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

  const title = movie.nameRu || movie.nameEn || 'Без названия';
  const ratingValue = movie.ratingKinopoisk || 0;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {title} ({movie.year})
      </Typography>
      <Box className="movie-detail__content">
        <img
          className="movie-detail__poster"
          src={movie.posterUrl}
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
