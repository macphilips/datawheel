import React from 'react';
import { useStore } from 'app/hooks/customHooks';
import { IStore } from 'app/interfaces/IStore';
import { getClicksPerSec } from 'app/utils';

export function Report() {
  const store = useStore();
  const report = getReport(store);

  return (
    <div className="view-container center">
      <div>
        Report
        <div>
          <span>Total Click: </span>
          {report.totalClicks}
        </div>
        <div>
          <span>Average Clicks: </span>
          {report.averageClick}
        </div>
        <div>
          <span>Total Average Click Time (in seconds): </span>
          {report.averageTimeBetweenClicks}
        </div>
      </div>
    </div>
  );
}

function getReport(store: IStore) {
  const { clickHistory, totalClicks } = store;
  const averageClick = getClicksPerSec(clickHistory).reduce((average, curr, index) => {
    const result = (average * index + curr) / (index + 1);
    return parseFloat(result.toFixed(2));
  }, 0);

  let prevTimestamp = clickHistory[0] || new Date().getTime();
  const averageTimeBetweenClicks = clickHistory.reduce((averageTimeBetweenClicks, currTimestamp, index) => {
    const currTimeInSec = (currTimestamp - prevTimestamp) / 1000;
    const averageTime = (averageTimeBetweenClicks * index + currTimeInSec) / (index + 1);
    prevTimestamp = currTimestamp;

    return parseFloat(averageTime.toFixed(2));
  }, 0);

  return { averageTimeBetweenClicks, averageClick, totalClicks };
}
