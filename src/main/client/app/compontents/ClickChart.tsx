import React, { useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { getClicksPerSec, totalTimeInSec } from 'app/utils';
import { ChartToolbar, TimeFrame } from 'app/compontents/ChartToolbar';

import './ClickChart.scss';

type Props = {
  clickHistory: Array<number>;
};

export function ClickChart(props: Props) {
  const totalTime = totalTimeInSec(props.clickHistory);
  const [selected, onSelect] = useState<TimeFrame>(TimeFrame.ALL);
  const [startWindow, setStartWindow] = useState<number>(0);

  // generate data point for chart. These array represents the Y-Axis which is the total number of clicks per second
  // X-Axis represents the time in seconds between the first & last recorded click.
  const clicksPerSec = useMemo(() => getClicksPerSec(props.clickHistory), [props.clickHistory]);

  const calcSeries = getCalculatedSeries(clicksPerSec, startWindow, selected);
  const chartOption = useMemo(() => getOptions(startWindow, startWindow + calcSeries.length + 5), [startWindow, calcSeries]);

  return (
    <>
      <ChartToolbar maxWindow={totalTime} onChange={setStartWindow} selected={selected} onSelect={onSelect} />
      <Chart height="250" type="area" width="500" options={{ ...chartOption }} series={[{ name: 'Clicks/sec', data: calcSeries }]} />
    </>
  );
}

// Chart config option
const getOptions = (startX: number, endX: number) => {
  return {
    chart: {
      id: 'click-chart',
      toolbar: {
        autoSelected: 'zoom',
        tools: {
          download: false,
          selection: false,
          zoom: false,
          zoomin: true,
          zoomout: true,
          pan: true
        }
      },
      title: {
        text: 'Click Rate'
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
      style: 'hollow'
    },
    xaxis: {
      type: 'numeric',
      min: startX,
      max: endX,
      title: {
        text: 'Time (s)'
      }
    },
    yaxis: {
      min: 0,
      title: {
        text: 'Clicks'
      }
    }
  };
};

const getCalculatedSeries = (clicksPerSec: number[], startWindow: number, timeFrame: TimeFrame) => {
  if (timeFrame === TimeFrame.ALL) return clicksPerSec;
  return [...clicksPerSec].slice(startWindow, startWindow + timeFrame);
};
