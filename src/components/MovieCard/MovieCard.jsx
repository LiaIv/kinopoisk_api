import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { normalizeMovie } from '../../utils/movieAdapter';
import './MovieCard.css';

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { id, title, year, poster, rating, hasRating } = normalizeMovie(movie);

  const handleClick = () => {
    navigate(`/movie/${id}`);
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
