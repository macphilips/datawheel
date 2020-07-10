// Using react context API to manage state of the app
import React, { createContext, ReactNode, useContext, useState } from 'react';

export type ClickHistory = {
  counter: number
  timestamp: number
}
type Store = {
  updateCounter: (counter: number) => void
  history: ClickHistory[]
  totalCounter: number
}

export const StoreContext = createContext<Store | null>(null);

export function useStore(): Store {
  return useContext(StoreContext);
}

function StoreProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<ClickHistory[]>([]);
  const [counter, setCounter] = useState(0);
  const updateCounter = counter => {
    const newItem = {
      counter, timestamp: new Date().getTime()
    };
    setCounter(counter);
    setHistory([...history, newItem]);
  };


  const value = { history, updateCounter, totalCounter: counter };
  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
