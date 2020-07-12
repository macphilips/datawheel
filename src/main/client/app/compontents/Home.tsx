import React, { useState } from 'react';
import useDidMount from '@rooks/use-did-mount';
import { useDebounce } from 'app/hooks/useDebounce';
import { useApi, useStore } from 'app/hooks/customHooks';
import { Loader } from 'app/compontents/Loader';

import './Home.scss';

export function Home() {
  const { updateCount, history, totalCount, counterId, setCounter } = useStore();
  const [loading, setLoading] = useState(true);
  const { updateCount: updateCountApi, getCounter } = useApi();

  const [error, setError] = useState<string | null>(null);

  useDidMount(async () => {
    try {
      setLoading(true);
      const result = await getCounter();
      setCounter(result);
    } catch (e) {
      if (e.status !== 404) setError(e.message);
    }
    setLoading(false);
  });

  const debouncedCallApi = useDebounce(() => updateCountApi({ totalCount, counterHistory: history, id: counterId }));

  const onClick = () => {
    const updatedCounter = totalCount + 1;
    // setCount(updatedCounter);
    updateCount(updatedCounter);
    debouncedCallApi();
  };

  console.log('render ', totalCount);

  if (loading) return <Loader />;

  if (error !== null) return <div className="center">{error}</div>;

  return (
    <div className="home-root center">
      <div>
        <div>
          <span>Total count: </span> {totalCount || 0}
        </div>
        <div className="btn-container">
          <button onClick={onClick} className="btn">
            +1
          </button>
        </div>
      </div>
    </div>
  );
}
