import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import './MovieCard.css';

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const movieId = movie.kinopoiskId || movie.filmId;
  const title = movie.nameRu || movie.nameEn || 'Без названия';
  const year = movie.year || '';
  const poster = movie.posterUrlPreview || movie.posterUrl;
  const rawRating =
    movie.ratingKinopoisk || movie.ratingImdb || movie.rating || null;
  const hasRating = rawRating && rawRating !== 'null' && Number(rawRating) > 0;

  const handleClick = () => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <Card className="movie-card" onClick={handleClick}>
      <Box className="movie-card__image-wrapper">
        <CardMedia
          component="img"
          className="movie-card__poster"
          image={poster}
          alt={title}
        />
        <Box
          className={`movie-card__rating ${!hasRating ? 'movie-card__rating--none' : ''}`}
        >
          <StarIcon className="movie-card__star" />
          {hasRating ? rawRating : 0}
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
