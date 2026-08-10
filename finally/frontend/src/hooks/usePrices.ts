import { useState, useEffect, useRef, useCallback } from 'react';
import { PriceUpdate, TickerPriceMap, SparklineData, ConnectionStatus } from '../types';

const MAX_SPARKLINE_POINTS = 50;

export interface UsePricesReturn {
  prices: TickerPriceMap;
  sparklines: SparklineData;
  flashes: Record<string, 'flash-green' | 'flash-red' | ''>;
  connectionStatus: ConnectionStatus;
  lastUpdate: PriceUpdate | null;
}

export function usePrices(streamUrl: string = '/api/stream/prices'): UsePricesReturn {
  const [prices, setPrices] = useState<TickerPriceMap>({});
  const [sparklines, setSparklines] = useState<SparklineData>({});
  const [flashes, setFlashes] = useState<Record<string, 'flash-green' | 'flash-red' | ''>>({});
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [lastUpdate, setLastUpdate] = useState<PriceUpdate | null>(null);

  const prevPricesRef = useRef<Record<string, number>>({});
  const flashTimeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

  const handlePriceUpdate = useCallback((update: PriceUpdate) => {
    const { ticker, price } = update;
    setLastUpdate(update);

    setPrices((prev) => ({
      ...prev,
      [ticker]: update,
    }));

    setSparklines((prev) => {
      const currentList = prev[ticker] || [];
      const newList = [...currentList, price];
      if (newList.length > MAX_SPARKLINE_POINTS) {
        newList.shift();
      }
      return {
        ...prev,
        [ticker]: newList,
      };
    });

    const prevPrice = prevPricesRef.current[ticker];
    if (prevPrice !== undefined && prevPrice !== price) {
      const flashClass = price > prevPrice ? 'flash-green' : 'flash-red';
      
      setFlashes((prev) => ({
        ...prev,
        [ticker]: flashClass,
      }));

      if (flashTimeoutsRef.current[ticker]) {
        clearTimeout(flashTimeoutsRef.current[ticker]);
      }

      flashTimeoutsRef.current[ticker] = setTimeout(() => {
        setFlashes((prev) => ({
          ...prev,
          [ticker]: '',
        }));
      }, 500);
    }
    prevPricesRef.current[ticker] = price;
  }, []);

  useEffect(() => {
    let eventSource: EventSource | null = null;
    let reconnectTimer: NodeJS.Timeout | null = null;

    function connect() {
      if (typeof window === 'undefined') return;

      try {
        eventSource = new EventSource(streamUrl);
        setConnectionStatus('reconnecting');

        eventSource.onopen = () => {
          setConnectionStatus('connected');
        };

        eventSource.onmessage = (event) => {
          try {
            const data: PriceUpdate = JSON.parse(event.data);
            if (data && data.ticker && typeof data.price === 'number') {
              handlePriceUpdate(data);
            }
          } catch (e) {
            console.error('Error parsing SSE message:', e);
          }
        };

        eventSource.onerror = () => {
          setConnectionStatus('reconnecting');
          if (eventSource) {
            eventSource.close();
            eventSource = null;
          }
          // Retry connection in 3 seconds
          reconnectTimer = setTimeout(connect, 3000);
        };
      } catch (err) {
        console.error('Failed to initiate EventSource connection:', err);
        setConnectionStatus('disconnected');
      }
    }

    connect();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
      Object.values(flashTimeoutsRef.current).forEach((t) => clearTimeout(t));
    };
  }, [streamUrl, handlePriceUpdate]);

  return {
    prices,
    sparklines,
    flashes,
    connectionStatus,
    lastUpdate,
  };
}
