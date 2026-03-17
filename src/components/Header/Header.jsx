import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Badge,
  Box,
  Container,
  Drawer,
  IconButton,
  Tooltip,
} from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useThemeToggle } from '../../context/useThemeToggle';
import './Header.css';

function Header() {
  const favoritesCount = useSelector((state) => state.favorites.items.length);
  const { mode, toggleTheme } = useThemeToggle();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Домашняя' },
    { path: '/movies', label: 'Список фильмов' },
    { path: '/search', label: 'Поиск фильма' },
    { path: '/favorites', label: 'Избранное' },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleThemeToggle = () => {
    toggleTheme();
    closeMobileMenu();
  };

  return (
    <AppBar position="static" className="header" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar className="header__toolbar" disableGutters>
          <NavLink to="/" className="header__logo">
            <Box className="header__logo-mark" aria-hidden="true">
              <span className="header__logo-glow" />
              <span className="header__logo-frame">
                <VideoLibraryIcon className="header__logo-icon" />
              </span>
            </Box>
            <Box className="header__logo-text">
              <span className="header__logo-title">KINOPOISK APP</span>
              <span className="header__logo-subtitle">ГИД ФИЛЬМОВ</span>
            </Box>
          </NavLink>
          <Box component="nav" className="header__nav header__nav--desktop">
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
            <IconButton
              onClick={toggleTheme}
              className="header__theme-btn header__theme-btn--desktop"
            >
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Открыть меню">
            <IconButton
              onClick={() => setIsMobileMenuOpen(true)}
              className="header__menu-btn"
              aria-label="Открыть меню"
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={closeMobileMenu}
        PaperProps={{
          className: `header__drawer ${
            mode === 'light' ? 'header__drawer--light' : ''
          }`,
        }}
      >
        <Box className="header__drawer-inner" role="presentation">
          <Box className="header__drawer-top">
            <span className="header__drawer-title">Меню</span>
            <IconButton
              onClick={closeMobileMenu}
              className="header__drawer-close"
              aria-label="Закрыть меню"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box component="nav" className="header__drawer-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `header__drawer-link ${
                    isActive ? 'header__drawer-link--active' : ''
                  }`
                }
                end={item.path === '/'}
              >
                <span>{item.label}</span>
                {item.path === '/favorites' && favoritesCount > 0 && (
                  <Badge
                    badgeContent={favoritesCount}
                    color="primary"
                    className="header__drawer-badge"
                  />
                )}
              </NavLink>
            ))}
          </Box>

          <button
            type="button"
            onClick={handleThemeToggle}
            className="header__drawer-theme-btn"
          >
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            <span>
              {mode === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
            </span>
          </button>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Header;
