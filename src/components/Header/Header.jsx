import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Badge,
  Box,
  Container,
  IconButton,
  Tooltip,
} from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeToggle } from '../../context/useThemeToggle';
import './Header.css';

function Header() {
  const favoritesCount = useSelector((state) => state.favorites.items.length);
  const { mode, toggleTheme } = useThemeToggle();

  const navItems = [
    { path: '/', label: 'Домашняя' },
    { path: '/movies', label: 'Список фильмов' },
    { path: '/search', label: 'Поиск фильма' },
    { path: '/favorites', label: 'Избранное' },
  ];

  return (
    <AppBar position="static" className="header" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar className="header__toolbar" disableGutters>
          <NavLink to="/" className="header__logo">
            <VideoLibraryIcon fontSize="large" />
          </NavLink>
          <Box component="nav" className="header__nav">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `header__link ${isActive ? 'header__link--active' : ''}`
                }
                end={item.path === '/'}
              >
                {item.label}
                {item.path === '/favorites' && favoritesCount > 0 && (
                  <Badge
                    badgeContent={favoritesCount}
                    color="primary"
                    className="header__badge"
                  />
                )}
              </NavLink>
            ))}
          </Box>
          <Tooltip title={mode === 'dark' ? 'Светлая тема' : 'Тёмная тема'}>
            <IconButton onClick={toggleTheme} className="header__theme-btn">
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
