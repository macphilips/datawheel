import React, { createContext, ReactNode, useState } from 'react';
import { IStore } from 'app/interfaces/IStore';
import { CounterDTO } from 'app/interfaces/IApiClient';

export const StoreContext = createContext<IStore | null>(null);

function StoreProvider({ children }: { children: ReactNode }) {
  const [counter, setCount] = useState<null | CounterDTO>({ clickTimestampHistory: [], totalClicks: null, id: null });
  const updateCount = (count: number) => {
    const { clickTimestampHistory } = counter;
    setCount({
      ...counter,
      totalClicks: count,
      clickTimestampHistory: [...clickTimestampHistory, new Date().getTime()]
    });
  };

  const setCounter = (counter: CounterDTO) => {
    setCount(counter);
  };
  const { clickTimestampHistory, totalClicks, id: counterId } = counter;
  const value: IStore = {
    updateClickCount: updateCount,
    setCounter,
    totalClicks,
    counterId,
    clickHistory: clickTimestampHistory
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export default StoreProvider;
