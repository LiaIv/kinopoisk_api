import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Rating,
  IconButton,
  Skeleton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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
  const { movie, actors, loading, error } = useMovieDetails(id);
  const [isPosterLoading, setIsPosterLoading] = useState(true);
  const [isFavoriteLocal, setIsFavoriteLocal] = useState(false);
  const [isFavoriteAnimating, setIsFavoriteAnimating] = useState(false);
  const shouldAnimateFavoriteRef = useRef(false);
  const poster = getMoviePoster(movie);

  useEffect(() => {
    if (!poster) {
      setIsPosterLoading(false);
      return undefined;
    }

    let isActive = true;
    const image = new Image();

    setIsPosterLoading(true);

    const handleComplete = () => {
      if (isActive) {
        setIsPosterLoading(false);
      }
    };

    image.onload = handleComplete;
    image.onerror = handleComplete;
    image.src = poster;

    if (image.complete) {
      handleComplete();
    }

    return () => {
      isActive = false;
    };
  }, [poster]);

  const isFavorite = favorites.some((item) => getMovieId(item) === movieId);

  useEffect(() => {
    setIsFavoriteLocal(isFavorite);
  }, [isFavorite]);

  const handleToggleFavorite = () => {
    const nextIsFavorite = !isFavoriteLocal;

    shouldAnimateFavoriteRef.current = true;
    setIsFavoriteLocal(nextIsFavorite);
    setIsFavoriteAnimating(false);

    if (isFavoriteLocal) {
      dispatch(removeFavorite(movieId));
    } else {
      dispatch(addFavorite(toFavoriteMovie(movie)));
    }
  };

  useEffect(() => {
    if (!movie || !shouldAnimateFavoriteRef.current) {
      return undefined;
    }

    shouldAnimateFavoriteRef.current = false;
    setIsFavoriteAnimating(true);

    const timeoutId = window.setTimeout(() => {
      setIsFavoriteAnimating(false);
    }, 220);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isFavoriteLocal, movie]);

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
  const ratingValue = Number(getMovieRating(movie)) || 0;

  return (
    <Box>
      <Box className="movie-detail__back">
        <IconButton
          onClick={() => navigate(-1)}
          className="movie-detail__back-btn"
          aria-label="Назад"
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" gutterBottom>
        {title} {year && `(${year})`}
      </Typography>
      <Box className="movie-detail__content">
        <Box className="movie-detail__poster-wrap">
          {isPosterLoading && (
            <Skeleton
              variant="rectangular"
              animation="wave"
              className="movie-detail__poster-skeleton"
            />
          )}
          <img
            className={`movie-detail__poster ${
              !isPosterLoading ? 'movie-detail__poster--loaded' : ''
            }`}
            src={poster}
            alt={title}
          />
          <IconButton
            onClick={handleToggleFavorite}
            className={`movie-detail__favorite-mobile ${
              isFavoriteLocal ? 'movie-detail__favorite-mobile--active' : ''
            } ${
              isFavoriteAnimating ? 'movie-detail__favorite-mobile--animating' : ''
            }`}
            disableRipple
            disableFocusRipple
            aria-label={
              isFavoriteLocal ? 'Удалить из избранного' : 'Добавить в избранное'
            }
          >
            {isFavoriteLocal ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
        <Box className="movie-detail__info">
          <Typography variant="h6" gutterBottom>
            Описание
          </Typography>
          <Typography variant="body1" paragraph>
            {movie.description || 'Описание отсутствует'}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Актёры
          </Typography>
          <Typography
            variant="body1"
            paragraph
            className="movie-detail__actors"
          >
            {actors.length > 0
              ? actors.join(', ')
              : 'Информация об актёрах отсутствует'}
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
              color={isFavoriteLocal ? 'error' : 'primary'}
              startIcon={
                isFavoriteLocal ? <RemoveCircleIcon /> : <FavoriteIcon />
              }
              className="movie-detail__favorite-desktop"
              disableRipple
              onClick={handleToggleFavorite}
            >
              {isFavoriteLocal ? 'Удалить из избранного' : 'Добавить в избранное'}
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
