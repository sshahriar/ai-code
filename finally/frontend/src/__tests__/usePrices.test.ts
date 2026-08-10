import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { usePrices } from '../hooks/usePrices';

describe('usePrices custom hook', () => {
  let mockEventSourceInstances: any[] = [];

  beforeEach(() => {
    mockEventSourceInstances = [];
    (global as any).EventSource = vi.fn().mockImplementation((url: string) => {
      const instance = {
        url,
        onopen: null as any,
        onmessage: null as any,
        onerror: null as any,
        close: vi.fn(),
      };
      mockEventSourceInstances.push(instance);
      return instance;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes SSE EventSource connection and handles price updates', () => {
    const { result } = renderHook(() => usePrices('/api/stream/prices'));

    expect((global as any).EventSource).toHaveBeenCalledWith('/api/stream/prices');
    expect(result.current.connectionStatus).toBe('reconnecting');

    const instance = mockEventSourceInstances[0];

    // Simulate open connection
    act(() => {
      if (instance.onopen) instance.onopen();
    });
    expect(result.current.connectionStatus).toBe('connected');

    // Simulate incoming SSE price message
    act(() => {
      if (instance.onmessage) {
        instance.onmessage({
          data: JSON.stringify({
            ticker: 'AAPL',
            price: 185.0,
            previous_price: 180.0,
            timestamp: 1700000000,
            change: 5.0,
            change_percent: 2.77,
            direction: 'up',
          }),
        });
      }
    });

    expect(result.current.prices['AAPL']?.price).toBe(185.0);
    expect(result.current.sparklines['AAPL']).toEqual([185.0]);
  });
});
