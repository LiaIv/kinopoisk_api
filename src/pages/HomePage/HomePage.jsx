import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Paper } from '@mui/material';
import TheatersRoundedIcon from '@mui/icons-material/TheatersRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <TheatersRoundedIcon fontSize="large" />,
      tone: 'violet',
      title: 'Список фильмов',
      text: 'Просматривайте популярные фильмы с высокими рейтингами',
    },
    {
      icon: <ManageSearchRoundedIcon fontSize="large" />,
      tone: 'blue',
      title: 'Поиск фильмов',
      text: 'Найдите интересующий вас фильм по названию',
    },
    {
      icon: <FavoriteRoundedIcon fontSize="large" />,
      tone: 'rose',
      title: 'Избранное',
      text: 'Сохраняйте понравившиеся фильмы для быстрого доступа',
    },
    {
      icon: <AutoAwesomeRoundedIcon fontSize="large" />,
      tone: 'gold',
      title: 'Детальная информация',
      text: 'Узнавайте подробности и рейтинги каждого фильма',
    },
  ];

  return (
    <Box>
      <Box className="home-hero">
        <Typography variant="h3" className="home-hero__title">
          Кинопоиск App
        </Typography>
        <Typography variant="h6" className="home-hero__subtitle">
          Ваш персональный гид по миру кино. Находите фильмы, сохраняйте
          избранное и узнавайте всё о любимых картинах.
        </Typography>
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/movies')}
          className="home-hero__button"
        >
          Смотреть фильмы
        </Button>
      </Box>
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Возможности приложения
      </Typography>
      <Box className="home-features">
        {features.map((feature) => (
          <Paper key={feature.title} className="home-feature-card" elevation={2}>
            <Box
              className={`home-feature-card__icon home-feature-card__icon--${feature.tone}`}
            >
              {feature.icon}
            </Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {feature.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {feature.text}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default HomePage;
