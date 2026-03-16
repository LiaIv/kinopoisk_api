import { useEffect, useState } from 'react';

export const useCancelableRequest = ({
  requestKey,
  request,
  enabled = true,
  initialData,
  resetDataOnDisable = false,
  resetDataOnError = false,
}) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      setError(null);

      if (resetDataOnDisable) {
        setData(initialData);
      }

      return undefined;
    }

    const controller = new AbortController();
    let isActive = true;

    const runRequest = async () => {
      try {
        setLoading(true);
        setError(null);
        const nextData = await request({ signal: controller.signal });

        if (isActive) {
          setData(nextData);
        }
      } catch (err) {
        if (!isActive || err.name === 'AbortError') {
          return;
        }

        setError(err.message);

        if (resetDataOnError) {
          setData(initialData);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    runRequest();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [
    enabled,
    initialData,
    request,
    requestKey,
    resetDataOnDisable,
    resetDataOnError,
  ]);

  return {
    data,
    loading,
    error,
  };
};
