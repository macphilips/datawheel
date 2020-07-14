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

  // calculates average clicks by find the average of clicks per sec
  // between the first and last recorded click window
  const averageClick = getClicksPerSec(clickHistory).reduce((average, curr, index) => {
    const result = (average * index + curr) / (index + 1);
    return parseFloat(result.toFixed(2));
  }, 0);

  // calculates the average time between click
  // For example given am array of timestamps [t1,t2,t3, t4]
  // average = ((t2-t1) + (t3-t2) + (t4-t3)) / 3
  const history = [...clickHistory];
  let prevTimestamp = history.shift();
  const averageTimeBetweenClicks = history.reduce((averageTimeBetweenClicks, currTimestamp, index) => {
    const currTimeInSec = (currTimestamp - prevTimestamp) / 1000;
    const averageTime = (averageTimeBetweenClicks * index + currTimeInSec) / (index + 1);
    prevTimestamp = currTimestamp;

    return parseFloat(averageTime.toFixed(2));
  }, 0);

  return { averageTimeBetweenClicks, averageClick, totalClicks };
}
