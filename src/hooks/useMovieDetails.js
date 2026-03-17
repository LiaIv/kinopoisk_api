import { useCallback } from 'react';
import { getMovieById, getMovieStaff } from '../api/kinopoiskApi';
import { useCancelableRequest } from './useCancelableRequest';

const initialMovieDetailsData = {
  movie: null,
  actors: [],
};

export const useMovieDetails = (id) => {
  const request = useCallback(
    async ({ signal }) => {
      const [movieResult, staffResult] = await Promise.allSettled([
        getMovieById(id, { signal }),
        getMovieStaff(id, { signal }),
      ]);

      if (movieResult.status === 'rejected') {
        throw movieResult.reason;
      }

      const actors = staffResult.status === 'fulfilled'
        ? staffResult.value
            .filter((person) => person.professionKey === 'ACTOR')
            .map((person) => person.nameRu || person.nameEn)
            .filter(Boolean)
            .slice(0, 8)
        : [];

      return {
        movie: movieResult.value,
        actors,
      };
    },
    [id],
  );

  const { data, loading, error } = useCancelableRequest({
    enabled: Boolean(id),
    initialData: initialMovieDetailsData,
    requestKey: id,
    request,
  });

  return {
    movie: data.movie,
    actors: data.actors,
    loading,
    error,
  };
};
