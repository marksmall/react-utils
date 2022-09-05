import { useEffect, useRef } from 'react';

/**
 * Wait for the delay, then execute the callback function.
 *
 * @param callback The callback function to be executed.
 * @param delay The delay before executing callback.
 */
export const useTimeout = (callback: () => void, delay: number): void => {
  const savedCallback = useRef(callback);

  useEffect(() => (savedCallback.current = callback), [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();

    const id = setTimeout(tick, delay);

    return () => clearTimeout(id);
  }, [delay]);
};
