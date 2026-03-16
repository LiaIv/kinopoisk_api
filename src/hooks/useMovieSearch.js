import { useCallback, useState } from 'react';
import { searchMovies } from '../api/kinopoiskApi';
import { useCancelableRequest } from './useCancelableRequest';

const EMPTY_MOVIES = [];

export const useMovieSearch = () => {
  const [query, setQuery] = useState('');
  const trimmedQuery = query.trim();
  const enabled = trimmedQuery.length >= 2;
  const request = useCallback(
    async ({ signal }) => {
      const response = await searchMovies(trimmedQuery, 1, { signal });
      return response.films || EMPTY_MOVIES;
    },
    [trimmedQuery],
  );

  const { data, loading, error } = useCancelableRequest({
    enabled,
    initialData: EMPTY_MOVIES,
    requestKey: trimmedQuery,
    resetDataOnDisable: true,
    resetDataOnError: true,
    request,
  });

  return {
    query,
    setQuery,
    movies: enabled ? data : EMPTY_MOVIES,
    loading,
    error,
    searched: enabled && !error,
  };
};
