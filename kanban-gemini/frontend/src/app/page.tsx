'use client';

import { useState } from 'react';
import { LoginPage } from '@/components/LoginPage';
import { KanbanBoard } from '@/components/KanbanBoard';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return <KanbanBoard />;
}
