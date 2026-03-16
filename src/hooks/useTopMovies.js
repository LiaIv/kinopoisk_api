import { useEffect, useState } from 'react';
import { getTopMovies } from '../api/kinopoiskApi';
import { enrichMoviesWithRatings } from '../services/moviesService';

const INITIAL_STATE = {
  items: [],
  totalPages: 1,
};

export const useTopMovies = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getTopMovies(page, { signal: controller.signal });

        if (!isActive) {
          return;
        }

        setData({
          items: response.items || [],
          totalPages: response.totalPages || 1,
        });
        setLoading(false);

        const enrichedItems = await enrichMoviesWithRatings(response.items || [], {
          signal: controller.signal,
        });

        if (!isActive) {
          return;
        }

        setData({
          items: enrichedItems,
          totalPages: response.totalPages || 1,
        });
      } catch (err) {
        if (!isActive || err.name === 'AbortError') {
          return;
        }

        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovies();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [page]);

  return {
    page,
    setPage,
    movies: data.items,
    totalPages: data.totalPages,
    loading,
    error,
  };
};
