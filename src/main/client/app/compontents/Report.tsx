import React from 'react';
import { useStore } from 'app/hooks/customHooks';
import { getClicksPerSec } from 'app/compontents/Home';

export function Report() {
  const { history, totalCount } = useStore();
  const report = getReport(
    history.map(_ => _.timestamp),
    totalCount
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

function getReport(clickHistoryTimestamp: number[], totalCount: number) {
  const averageClick = getClicksPerSec(clickHistoryTimestamp).reduce((average, curr, index) => {
    const result = (average * index + curr) / (index + 1);
    return parseFloat(result.toFixed(2));
  }, 0);

  let prevTimestamp = clickHistoryTimestamp[0] || new Date().getTime();
  const averageTimeBetweenClicks = clickHistoryTimestamp.reduce((averageTimeBetweenClicks, currTimestamp, index) => {
    const currTimeInSec = (currTimestamp - prevTimestamp) / 1000;
    const averageTime = (averageTimeBetweenClicks * index + currTimeInSec) / (index + 1);
    prevTimestamp = currTimestamp;

    return parseFloat(averageTime.toFixed(2));
  }, 0);

  return { averageTimeBetweenClicks, averageClick, totalCount: totalCount };
}
