import { useContext } from 'react';
import { ThemeToggleContext } from './ThemeToggleContext';

export const useThemeToggle = () => useContext(ThemeToggleContext);
