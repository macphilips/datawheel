import React, { createContext, ReactNode, useState } from 'react';
import { ClickHistory, IStore } from 'app/interfaces/IStore';

export const StoreContext = createContext<IStore | null>(null);

function StoreProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<ClickHistory[]>([]);
  const [counter, setCounter] = useState(0);
  const updateCounter = counter => {
    const newItem = {
      counter,
      timestamp: new Date().getTime()
    };
    setCounter(counter);
    setHistory([...history, newItem]);
  };

  const value = { history, updateCounter, totalCounter: counter };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export default StoreProvider;
