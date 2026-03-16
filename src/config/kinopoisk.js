const DEFAULT_API_KEY = '8c8e1a50-6322-4135-8875-5d40a5420d86';
const DEFAULT_BASE_URL = 'https://kinopoiskapiunofficial.tech/api';

export const KINOPOISK_API_KEY =
  import.meta.env.VITE_KINOPOISK_API_KEY || DEFAULT_API_KEY;

export const KINOPOISK_BASE_URL =
  import.meta.env.VITE_KINOPOISK_BASE_URL || DEFAULT_BASE_URL;
