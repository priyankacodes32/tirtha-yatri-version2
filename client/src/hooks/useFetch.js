import { useEffect, useState, useCallback, useRef } from 'react';

// Our free-tier backend spins down after idling and can take up to ~50s to
// wake back up on the first request after a while, which otherwise looks
// like a broken component. Retry a couple of times before giving up, and
// surface `waking` so callers can show a "waking up the server" message
// instead of a plain spinner.
const RETRY_DELAYS_MS = [4000, 8000];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
  const [waking, setWaking] = useState(false);
  const [error, setError] = useState(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const load = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setWaking(false);
    setError(null);

    const attempt = async (retriesLeft) => {
      try {
        const result = await fetcherRef.current();
        if (!cancelled) setData(result);
      } catch (err) {
        if (cancelled) return;
        if (retriesLeft > 0) {
          setWaking(true);
          await wait(RETRY_DELAYS_MS[RETRY_DELAYS_MS.length - retriesLeft] || RETRY_DELAYS_MS[0]);
          if (!cancelled) await attempt(retriesLeft - 1);
          return;
        }
        setError(err?.response?.data?.message || err.message || 'Something went wrong');
      } finally {
        if (!cancelled && retriesLeft === 0) {
          setLoading(false);
          setWaking(false);
        }
      }
    };

    attempt(RETRY_DELAYS_MS.length).finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => load(), [load]);

  return { data, loading, waking, error, refetch: load };
}
