import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';

type Props = {
  clicksPerSec: Array<number>;
};

export function ClickChart(props: Props) {
  const chartOption = getOptions()
  const series = useMemo(() => {
    return [
      {
        name: 'Clicks/sec',
        data: props.clicksPerSec
      }
    ];
  }, [props.clicksPerSec]);
  return (
    <div>
      <Chart height="250" options={chartOption} series={series} type="area" width="500" />
    </div>
  );
}

const getOptions = () => {
  return {
    chart: {
      id: 'click-chart',
      toolbar: false
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
      min: 0,
      tickAmount: 1
    },
    yaxis: {
      label: "Clicks",
      type: 'numeric',
      min: 0,
      tickAmount: 2
    }
  };
};
