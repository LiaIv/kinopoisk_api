import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Skeleton,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { normalizeMovie } from '../../utils/movieAdapter';
import './MovieCard.css';

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { id, title, year, poster, rating, hasRating } = normalizeMovie(movie);
  const [isPosterLoading, setIsPosterLoading] = useState(true);

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

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <Card className="movie-card" onClick={handleClick}>
      <Box className="movie-card__image-wrapper">
        {isPosterLoading && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            className="movie-card__poster-skeleton"
          />
        )}
        <CardMedia
          component="img"
          className={`movie-card__poster ${
            !isPosterLoading ? 'movie-card__poster--loaded' : ''
          }`}
          image={poster}
          alt={title}
        />
        <Box
          className={`movie-card__rating ${!hasRating ? 'movie-card__rating--none' : ''}`}
        >
          <StarIcon className="movie-card__star" />
          {hasRating ? rating : 0}
        </Box>
        <Box className="movie-card__overlay">
          <Typography variant="body2" className="movie-card__overlay-text">
            Подробнее
          </Typography>
        </Box>
      </Box>
      <CardContent className="movie-card__content">
        <Typography variant="body2" className="movie-card__title">
          {title} {year && `(${year})`}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
