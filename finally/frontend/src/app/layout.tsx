import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FinAlly — AI Trading Workstation',
  description: 'Data-dense AI trading terminal with real-time streaming market data, portfolio analytics, and AI copilot.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-terminal-text antialiased selection:bg-accent-yellow selection:text-black">
        {children}
      </body>
    </html>
  );
}
