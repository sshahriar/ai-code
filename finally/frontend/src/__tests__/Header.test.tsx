import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from '../components/Header';

describe('Header component', () => {
  it('renders portfolio total value and cash balance formatted as currency', () => {
    render(
      <Header
        totalValue={12345.67}
        cashBalance={5000.0}
        connectionStatus="connected"
      />
    );

    expect(screen.getByText('FinAlly')).toBeInText();
    expect(screen.getByText('$12,345.67')).toBeInText();
    expect(screen.getByText('$5,000.00')).toBeInText();
  });

  it('renders connected status badge correctly', () => {
    render(
      <Header
        totalValue={10000}
        cashBalance={10000}
        connectionStatus="connected"
      />
    );

    const statusText = screen.getByTestId('connection-status-text');
    expect(statusText).toHaveTextContent('LIVE STREAM');

    const statusDot = screen.getByTestId('connection-status-dot');
    expect(statusDot.className).toContain('bg-emerald-500');
  });

  it('renders reconnecting status badge', () => {
    render(
      <Header
        totalValue={10000}
        cashBalance={10000}
        connectionStatus="reconnecting"
      />
    );

    const statusText = screen.getByTestId('connection-status-text');
    expect(statusText).toHaveTextContent('RECONNECTING');

    const statusDot = screen.getByTestId('connection-status-dot');
    expect(statusDot.className).toContain('bg-amber-500');
  });

  it('renders disconnected status badge', () => {
    render(
      <Header
        totalValue={10000}
        cashBalance={10000}
        connectionStatus="disconnected"
      />
    );

    const statusText = screen.getByTestId('connection-status-text');
    expect(statusText).toHaveTextContent('OFFLINE');

    const statusDot = screen.getByTestId('connection-status-dot');
    expect(statusDot.className).toContain('bg-rose-500');
  });
});
