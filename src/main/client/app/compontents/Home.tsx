import React, { useState } from 'react';
import useDidMount from '@rooks/use-did-mount';
import { useDebounce } from 'app/hooks/useDebounce';
import { useApi, useStore } from 'app/hooks/customHooks';
import { Loader } from 'app/compontents/Loader';
import { ClickChart } from 'app/compontents/ClickChart';

import './Home.scss';

export function Home() {
  const { updateClickCount, clickHistory, totalClicks, counterId, setCounter } = useStore();
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

  const debouncedCallApi = useDebounce(() =>
    updateCountApi({
      totalClicks,
      clickTimestampHistory: clickHistory,
      id: counterId
    })
  );

  const onClick = () => {
    const updatedCounter = totalClicks + 1;
    updateClickCount(updatedCounter);
    debouncedCallApi();
  };

  if (loading) return <Loader />;

  if (error !== null) return <div className="home-root view-container center">{error}</div>;

  return (
    <div className="home-root view-container center">
      <div>
        <div className="center col">
          <div>
            <span>Total Clicks: </span> {totalClicks || 0}
          </div>
          <div className="btn-container">
            <button onClick={onClick} className="btn">
              +1
            </button>
          </div>
        </div>
        <ClickChart clickHistory={clickHistory} />
      </div>
    </div>
  );
}
