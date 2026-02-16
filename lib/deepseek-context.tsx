'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface DeepSeekContextType {
  apiKey: string | null;
  setApiKey: (key: string) => void;
  isConfigured: boolean;
}

const DeepSeekContext = createContext<DeepSeekContextType | undefined>(undefined);

export function DeepSeekProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKeyState] = useState<string | null>(
    typeof window !== 'undefined' 
      ? localStorage.getItem('deepseek_api_key')
      : null
  );

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    if (typeof window !== 'undefined') {
      localStorage.setItem('deepseek_api_key', key);
    }
  };

  const isConfigured = !!apiKey;

  return (
    <DeepSeekContext.Provider value={{ apiKey, setApiKey, isConfigured }}>
      {children}
    </DeepSeekContext.Provider>
  );
}

export function useDeepSeek() {
  const context = useContext(DeepSeekContext);
  if (context === undefined) {
    throw new Error('useDeepSeek must be used within a DeepSeekProvider');
  }
  return context;
}
