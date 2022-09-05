import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { renderHook } from '@testing-library/react-hooks';

import { useTimeout } from './useTimeout';

describe('useInterval', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should execute the callback function X times', () => {
    const callback = vi.fn();
    renderHook(() => useTimeout(callback, 1000));

    vi.advanceTimersByTime(2000);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).not.toHaveBeenCalledTimes(2);
  });
});
