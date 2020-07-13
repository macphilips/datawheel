import React from 'react';
import { useStore } from 'app/hooks/customHooks';

export function Report() {
  const { history, totalCount } = useStore();
  let prevTimestamp = (history[0] || { timestamp: new Date().getTime() }).timestamp;
  const report = history.reduce(
    (prev, curr, index) => {
      const averageClick = 0;

      const currTimeInSec = (curr.timestamp - prevTimestamp) / 1000;
      const averageTime = (prev.averageTimeBetweenClicks * index + currTimeInSec) / (index + 1);
      prevTimestamp = curr.timestamp;

      return { averageClick, totalCount, averageTimeBetweenClicks: parseFloat(averageTime.toFixed(2)) };
    },
    { averageTimeBetweenClicks: 0, averageClick: 0, totalCount: totalCount }
  );
  console.log(report);
  return (
    <div className="view-container center">
      <div>
        Report
        <div>
          <span>Total Click: </span>
          {report.totalCount}
        </div>
        <div>
          <span>Total Click: </span>
          {report.totalCount}
        </div>
        <div>
          <span>Total Average Click Time (in seconds): </span>
          {report.averageTimeBetweenClicks}
        </div>
      </div>
    </div>
  );
}
