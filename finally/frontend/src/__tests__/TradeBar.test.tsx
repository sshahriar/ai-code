import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TradeBar } from '../components/TradeBar';
import { TickerPriceMap, Position } from '../types';

describe('TradeBar component', () => {
  const mockPrices: TickerPriceMap = {
    AAPL: {
      ticker: 'AAPL',
      price: 150.0,
      previous_price: 148.0,
      timestamp: Date.now(),
      change: 2.0,
      change_percent: 1.35,
      direction: 'up',
    },
  };

  const mockPositions: Position[] = [
    { ticker: 'AAPL', quantity: 10, avg_cost: 140.0 },
  ];

  it('renders order inputs and price estimates', () => {
    render(
      <TradeBar
        selectedTicker="AAPL"
        prices={mockPrices}
        cashBalance={10000}
        positions={mockPositions}
        onExecuteTrade={async () => {}}
      />
    );

    expect(screen.getByDisplayValue('AAPL')).toBeInText();
    expect(screen.getByDisplayValue('1')).toBeInText();
    expect(screen.getByText('INSTANT BUY')).toBeInText();
    expect(screen.getByText('INSTANT SELL')).toBeInText();
  });

  it('executes instant buy trade on button click', async () => {
    const tradeMock = vi.fn().mockResolvedValue(undefined);
    render(
      <TradeBar
        selectedTicker="AAPL"
        prices={mockPrices}
        cashBalance={10000}
        positions={mockPositions}
        onExecuteTrade={tradeMock}
      />
    );

    const buyBtn = screen.getByText('INSTANT BUY');
    fireEvent.click(buyBtn);

    await waitFor(() => {
      expect(tradeMock).toHaveBeenCalledWith('AAPL', 1, 'buy');
    });
  });

  it('displays validation error if quantity is invalid', async () => {
    const tradeMock = vi.fn();
    render(
      <TradeBar
        selectedTicker="AAPL"
        prices={mockPrices}
        cashBalance={10000}
        positions={mockPositions}
        onExecuteTrade={tradeMock}
      />
    );

    const qtyInput = screen.getByPlaceholderText('QTY');
    fireEvent.change(qtyInput, { target: { value: '0' } });

    const buyBtn = screen.getByText('INSTANT BUY');
    fireEvent.click(buyBtn);

    expect(screen.getByText('Quantity must be greater than 0')).toBeInText();
    expect(tradeMock).not.toHaveBeenCalled();
  });
});
