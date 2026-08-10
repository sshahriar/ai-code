import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Watchlist } from '../components/Watchlist';
import { WatchlistItem, TickerPriceMap, SparklineData } from '../types';

describe('Watchlist component', () => {
  const mockItems: WatchlistItem[] = [
    { ticker: 'AAPL', price: 180.5, change_percent: 1.25 },
    { ticker: 'GOOGL', price: 170.0, change_percent: -0.85 },
  ];

  const mockPrices: TickerPriceMap = {
    AAPL: {
      ticker: 'AAPL',
      price: 182.0,
      previous_price: 180.5,
      timestamp: Date.now(),
      change: 1.5,
      change_percent: 0.83,
      direction: 'up',
    },
  };

  const mockSparklines: SparklineData = {
    AAPL: [180.0, 181.0, 182.0],
    GOOGL: [171.0, 170.5, 170.0],
  };

  it('renders watchlist ticker items and live prices', () => {
    render(
      <Watchlist
        items={mockItems}
        prices={mockPrices}
        sparklines={mockSparklines}
        flashes={{ AAPL: 'flash-green' }}
        selectedTicker="AAPL"
        onSelectTicker={() => {}}
        onAddTicker={async () => {}}
        onRemoveTicker={async () => {}}
      />
    );

    expect(screen.getByText('AAPL')).toBeInText();
    expect(screen.getByText('GOOGL')).toBeInText();
    expect(screen.getByText('$182.00')).toBeInText();
    expect(screen.getByText('$170.00')).toBeInText();
  });

  it('calls onSelectTicker when ticker row is clicked', () => {
    const onSelectMock = vi.fn();
    render(
      <Watchlist
        items={mockItems}
        prices={mockPrices}
        sparklines={mockSparklines}
        flashes={{}}
        selectedTicker="AAPL"
        onSelectTicker={onSelectMock}
        onAddTicker={async () => {}}
        onRemoveTicker={async () => {}}
      />
    );

    fireEvent.click(screen.getByText('GOOGL'));
    expect(onSelectMock).toHaveBeenCalledWith('GOOGL');
  });

  it('calls onAddTicker when add ticker form is submitted', async () => {
    const onAddMock = vi.fn().mockResolvedValue(undefined);
    render(
      <Watchlist
        items={mockItems}
        prices={mockPrices}
        sparklines={mockSparklines}
        flashes={{}}
        selectedTicker="AAPL"
        onSelectTicker={() => {}}
        onAddTicker={onAddMock}
        onRemoveTicker={async () => {}}
      />
    );

    const input = screen.getByPlaceholderText(/ADD TICKER/i);
    fireEvent.change(input, { target: { value: 'NVDA' } });

    const addButton = screen.getByRole('button', { name: /ADD/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(onAddMock).toHaveBeenCalledWith('NVDA');
    });
  });
});
