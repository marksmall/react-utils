import { useEffect, useRef } from 'react';

/**
 * Call the callback function, then keep repeating the callback function
 * after the delay, until clearInterval called.
 *
 * @param callback The callback function to be executed.
 * @param delay The delay between executions.
 */
export const useInterval = (callback: () => void, delay: number): void => {
  const savedCallback = useRef(callback);

  useEffect(() => (savedCallback.current = callback), [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();

    const id = setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay]);
};
