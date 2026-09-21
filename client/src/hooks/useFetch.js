import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * Shared data-fetching pattern: loading/error/data state for a single async
 * call, re-run whenever `deps` changes. Avoids re-implementing the same
 * three `useState`s on every page that talks to the API.
 *
 * @param {() => Promise<any>} fetcher
 * @param {any[]} deps
 */
export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const load = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetcherRef
      .current()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.response?.data?.message || err.message || 'Something went wrong');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => load(), [load]);

  return { data, loading, error, refetch: load };
}
