import React, { createContext, ReactNode, useState } from 'react';
import { IStore } from 'app/interfaces/IStore';
import { CounterDTO } from 'app/interfaces/IApiClient';

export const StoreContext = createContext<IStore | null>(null);

function StoreProvider({ children }: { children: ReactNode }) {
  const [counter, setCount] = useState<null | CounterDTO>({ counterHistory: [], totalCount: null, id: null });
  const updateCount = (count: number) => {
    const { counterHistory } = counter;
    const newItem = {
      count,
      timestamp: new Date().getTime()
    };
    setCount({ ...counter, totalCount: count, counterHistory: [...counterHistory, newItem] });
  };

  const setCounter = (counter: CounterDTO) => {
    setCount(counter);
  };
  const { counterHistory, totalCount, id: counterId } = counter;
  const value: IStore = {
    updateCount,
    setCounter,
    history: counterHistory,
    totalCount,
    counterId
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export default StoreProvider;
