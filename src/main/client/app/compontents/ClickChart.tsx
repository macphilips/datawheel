import React, { useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { getClicksPerSec, totalTimeInSec } from 'app/utils';

import './ClickChart.scss';
import { ChartToolbar, TimeFrame } from 'app/compontents/ChartToolbar';

type Props = {
  clickHistory: Array<number>;
};

export function ClickChart(props: Props) {
  const totalTime = totalTimeInSec(props.clickHistory);
  const [selected, onSelect] = useState<TimeFrame>(TimeFrame.ALL);
  const [startWindow, setStartWindow] = useState<number>(0);
  const clicksPerSec = useMemo(() => getClicksPerSec(props.clickHistory), [props.clickHistory]);

  const getCalculateSeries = (clicksPerSec: number[], startWindow: number, timeFrame: TimeFrame) => {
    if (timeFrame === TimeFrame.ALL) return clicksPerSec;
    return [...clicksPerSec].slice(startWindow, startWindow + timeFrame);
  };

  const chartOption = getOptions(startWindow);

  const calcSeries = getCalculateSeries(clicksPerSec, startWindow, selected);
  return (
    <div>
      <ChartToolbar maxWindow={totalTime} onChange={setStartWindow} selected={selected} onSelect={onSelect} />
      <Chart height="250" type="area" width="500" options={{ ...chartOption }} series={[{ name: 'Clicks/sec', data: calcSeries }]} />
    </div>
  );
}

const getOptions = (startX: number) => {
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
