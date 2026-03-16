import { useCallback } from 'react';
import { getMovieById } from '../api/kinopoiskApi';
import { useCancelableRequest } from './useCancelableRequest';

export const useMovieDetails = (id) => {
  const request = useCallback(
    ({ signal }) => getMovieById(id, { signal }),
    [id],
  );

  const { data, loading, error } = useCancelableRequest({
    enabled: Boolean(id),
    initialData: null,
    requestKey: id,
    request,
  });

  return {
    movie: data,
    loading,
    error,
  };
};
