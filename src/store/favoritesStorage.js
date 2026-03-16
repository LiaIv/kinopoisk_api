const FAVORITES_STORAGE_KEY = 'favorites';

export const loadFavorites = () => {
  const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!saved) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem(FAVORITES_STORAGE_KEY);
    return [];
  }
};

export const saveFavorites = (items) => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // игнорируем ошибки записи в localStorage
  }
};
