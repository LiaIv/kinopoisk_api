import { useCallback, useEffect, useState } from 'react';
import { getTopMovies } from '../api/kinopoiskApi';
import { enrichMoviesWithRatings } from '../services/moviesService';

const INITIAL_MOVIES_STATE = {
  items: [],
  totalPages: 1,
};

const appendMovies = (currentItems, nextItems) => {
  return [...currentItems, ...nextItems];
};

const replaceLastLoadedPage = (currentItems, previousPageItemsCount, nextItems) => {
  return [
    ...currentItems.slice(0, Math.max(0, currentItems.length - previousPageItemsCount)),
    ...nextItems,
  ];
};

export const useTopMovies = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(INITIAL_MOVIES_STATE);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const loadMore = useCallback(() => {
    setPage((currentPage) => currentPage + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const loadPage = async () => {
      const isInitialPage = page === 1;

      try {
        if (isInitialPage) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        setError(null);

        const response = await getTopMovies(page, { signal: controller.signal });
        const pageItems = response.items || [];
        const totalPages = response.totalPages || 1;

        if (!isActive) {
          return;
        }

        setData((prevData) => {
          return {
            items: isInitialPage
              ? pageItems
              : appendMovies(prevData.items, pageItems),
            totalPages,
          };
        });

        if (isInitialPage) {
          setLoading(false);
        }

        const enrichedItems = await enrichMoviesWithRatings(pageItems, {
          signal: controller.signal,
        });

        if (!isActive) {
          return;
        }

        setData((prevData) => {
          if (isInitialPage) {
            return {
              items: enrichedItems,
              totalPages,
            };
          }

          return {
            items: replaceLastLoadedPage(
              prevData.items,
              pageItems.length,
              enrichedItems,
            ),
            totalPages,
          };
        });
      } catch (err) {
        if (!isActive || err.name === 'AbortError') {
          return;
        }

        setError(err.message);
        setLoading(false);
        setLoadingMore(false);
        return;
      }

      if (!isInitialPage) {
        setLoadingMore(false);
      }
    };

    loadPage();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [page]);

  return {
    page,
    loadMore,
    movies: data.items,
    totalPages: data.totalPages,
    loading,
    loadingMore,
    hasMore: page < data.totalPages,
    error,
  };
};
