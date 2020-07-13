import React, { useState } from 'react';
import useDidMount from '@rooks/use-did-mount';
import { useDebounce } from 'app/hooks/useDebounce';
import { useApi, useStore } from 'app/hooks/customHooks';
import { Loader } from 'app/compontents/Loader';
import { ClickChart } from 'app/compontents/ClickChart';

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

  if (loading) return <Loader />;

  if (error !== null) return <div className="home-root view-container center">{error}</div>;

  const historyTimeStamp = history.map(_ => _.timestamp);
  return (
    <div className="home-root view-container center">
      <div>
        <div className="center col">
          <div>
            <span>Total Clicks: </span> {totalCount || 0}
          </div>
          <div className="btn-container">
            <button onClick={onClick} className="btn">
              +1
            </button>
          </div>
        </div>
        <ClickChart clicksPerSec={getClicksPerSec(historyTimeStamp)} />
      </div>
    </div>
  );
}

export function getClicksPerSec(timestamps: number[]): number[] {
  const clicksPerSec = [];
  let start = timestamps[0];
  let counter = 0;
  timestamps.forEach((timestamp, index) => {
    const sec = (timestamp - start) / 1000;
    if (sec > 1) {
      clicksPerSec.push(counter);
      start = timestamp;
      counter = 0;
    }
    counter++;
  });
  return clicksPerSec;
}
