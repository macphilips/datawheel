import React from 'react';
import { useStore } from 'app/hooks/useStore';


export function Report() {
  const { history, totalCounter } = useStore();
  let prevTimestamp = (history[0] || { timestamp: new Date().getTime() }).timestamp;
  const report = history.reduce((prev, curr, index) => {
    const averageClick = 0;

    const currTimeInMilliSec = (curr.timestamp - prevTimestamp) / 1000;
    const averageTime = ((prev.averageTime * index) + currTimeInMilliSec) / (index + 1);
    prevTimestamp = curr.timestamp;

    return { averageClick, totalCounter, averageTime: parseFloat(averageTime.toFixed(2)) };
  }, { averageTime: 0, averageClick: 0, totalCounter });
  console.log(report);
  return (
    <div className="center">
      <div>
        Report
        <div><span>Total Click: </span>{report.totalCounter}</div>
        <div><span>Total Click: </span>{report.totalCounter}</div>
        <div><span>Total Average Click Time (in seconds): </span>{report.averageTime}</div>
      </div>
    </div>
  );
}
