import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PortfolioHeatmap } from '../components/PortfolioHeatmap';
import { PositionsTable } from '../components/PositionsTable';
import { Position, TickerPriceMap } from '../types';

describe('Portfolio components', () => {
  const mockPositions: Position[] = [
    { ticker: 'AAPL', quantity: 10, avg_cost: 150.0, current_price: 180.0 },
    { ticker: 'TSLA', quantity: 5, avg_cost: 200.0, current_price: 180.0 },
  ];

  const mockPrices: TickerPriceMap = {
    AAPL: {
      ticker: 'AAPL',
      price: 180.0,
      previous_price: 175.0,
      timestamp: Date.now(),
      change: 5.0,
      change_percent: 2.85,
      direction: 'up',
    },
    TSLA: {
      ticker: 'TSLA',
      price: 180.0,
      previous_price: 190.0,
      timestamp: Date.now(),
      change: -10.0,
      change_percent: -5.26,
      direction: 'down',
    },
  };

  it('PortfolioHeatmap renders position tiles and weight percentages', () => {
    render(<PortfolioHeatmap positions={mockPositions} prices={mockPrices} />);

    expect(screen.getByText('AAPL')).toBeInText();
    expect(screen.getByText('TSLA')).toBeInText();
    expect(screen.getByText('PORTFOLIO HEATMAP')).toBeInText();
  });

  it('PositionsTable renders tabular holdings with P&L calculation', () => {
    render(
      <PositionsTable
        positions={mockPositions}
        prices={mockPrices}
        selectedTicker="AAPL"
        onSelectTicker={() => {}}
      />
    );

    expect(screen.getByText('ACTIVE HOLDINGS')).toBeInText();
    expect(screen.getAllByText('AAPL').length).toBeGreaterThan(0);
    expect(screen.getByText('$1,800.00')).toBeInText(); // AAPL 10 * 180 = 1800
  });
});
