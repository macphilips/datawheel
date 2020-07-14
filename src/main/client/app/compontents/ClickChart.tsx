import React, { useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { getClicksPerSec, totalTimeInSec } from 'app/utils';
import { ChartToolbar, TimeFrame, Type } from 'app/compontents/ChartToolbar';

import './ClickChart.scss';

type Props = {
  clickHistory: Array<number>;
};

export function ClickChart(props: Props) {
  const totalTime = totalTimeInSec(props.clickHistory);
  const [selected, onSelect] = useState<TimeFrame>(TimeFrame.ALL);
  const [startWindow, setStartWindow] = useState<number>(0);
  const [endWindow, setEndWindow] = useState<number>(totalTime);

  // generate data point for chart. These array represents the Y-Axis which is the total number of clicks per second
  // X-Axis represents the time in seconds between the first & last recorded click.
  const clicksPerSec = useMemo(() => getClicksPerSec(props.clickHistory), [props.clickHistory]);

  const calcSeries = getCalculatedSeries(clicksPerSec, selected, startWindow, endWindow);
  const chartOption = useMemo(() => getOptions(startWindow, startWindow + calcSeries.length + 5), [startWindow, calcSeries]);

  const onChange = (value: number, type: Type) => {
    if (type === Type.START_X) setStartWindow(value);
    if (type === Type.END_X) setEndWindow(value);
  };

  return (
    <>
      <ChartToolbar maxWindow={totalTime} onChange={onChange} selected={selected} onSelect={onSelect} />
      <Chart height="250" type="area" width="500" options={{ ...chartOption }} series={[{ name: 'Clicks/sec', data: clicksPerSec }]} />
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

const getCalculatedSeries = (clicksPerSec: number[], timeFrame: TimeFrame, startWindow: number, endWindow: number) => {
  if (timeFrame === TimeFrame.ALL) return clicksPerSec;
  let end = startWindow + timeFrame;
  if (timeFrame === TimeFrame.OTHERS) {
    end = endWindow;
  }
  return [...clicksPerSec].slice(startWindow, end);
};
