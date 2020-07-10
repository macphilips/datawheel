import React, { useState } from 'react';
import useDidMount from '@rooks/use-did-mount';
import { useApi } from 'app/hooks/useApi';
import { Loader } from 'app/compontents/Loader';
import { useDebounce } from 'app/hooks/useDebounce';

import './Home.scss';
import { useStore } from 'app/hooks/useStore';

export function Home() {
  const { updateCounter, totalCounter } = useStore();
  const [count, setCounter] = useState(totalCounter);
  const [loading, setLoading] = useState(true);
  const { updateCount, getCounter } = useApi();

  useDidMount(async () => {
    // setLoading(true);
    // const result = await getCounter();
    // setCounter(result);
    setLoading(false);
  });

  const debouncedCallApi = useDebounce(() => updateCount(count));

  const onClick = () => {
    const updatedCounter = count + 1;
    setCounter(updatedCounter);
    updateCounter(updatedCounter);
    debouncedCallApi();
  };
  if (loading) return <Loader/>;
  return (
    <div className="home-root center">
      <div>
        <div><span>Total count: </span> {count}</div>
        <div className="btn-container">
          <button onClick={onClick} className="btn">+1</button>
        </div>
      </div>
    </div>
  );
}
