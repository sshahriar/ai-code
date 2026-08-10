import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChatPanel } from '../components/ChatPanel';
import { ChatMessage } from '../types';

describe('ChatPanel component', () => {
  const mockMessages: ChatMessage[] = [
    {
      id: 'msg-1',
      role: 'user',
      content: 'Buy 5 AAPL shares',
    },
    {
      id: 'msg-2',
      role: 'assistant',
      content: 'I have executed the purchase for you.',
      actions: {
        trades: [
          { ticker: 'AAPL', side: 'buy', quantity: 5, price: 180.0, status: 'filled' },
        ],
      },
    },
  ];

  it('renders chat conversation and inline action confirmation card', () => {
    render(
      <ChatPanel
        messages={mockMessages}
        isLoading={false}
        onSendMessage={async () => {}}
        isOpen={true}
        onToggleOpen={() => {}}
      />
    );

    expect(screen.getByText('Buy 5 AAPL shares')).toBeInText();
    expect(screen.getByText('I have executed the purchase for you.')).toBeInText();
    expect(screen.getByText('EXECUTED BUY: 5 AAPL')).toBeInText();
  });

  it('sends user message on form submit', async () => {
    const sendMock = vi.fn().mockResolvedValue(undefined);
    render(
      <ChatPanel
        messages={[]}
        isLoading={false}
        onSendMessage={sendMock}
        isOpen={true}
        onToggleOpen={() => {}}
      />
    );

    const input = screen.getByPlaceholderText(/Ask AI or execute command/i);
    fireEvent.change(input, { target: { value: 'What is my total portfolio value?' } });

    const submitBtn = screen.getByTitle('Send Message');
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(sendMock).toHaveBeenCalledWith('What is my total portfolio value?');
    });
  });
});
