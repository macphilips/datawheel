export function getClicksPerSec(timestamps: number[]): number[] {
  let clicksPerSec = [];
  let start = timestamps[0];
  let counter = 0;
  timestamps.forEach((timestamp) => {
    const sec = (timestamp - start) / 1000;
    if (sec > 1) {
      clicksPerSec.push(counter);
      const round = Math.round(sec - 1);
      clicksPerSec = clicksPerSec.concat(zeroArray(round));
      start = timestamp;
      counter = 0;
    }
    counter++;
  });
  return clicksPerSec;
}

export const totalTimeInSec = (timestamps: number[]) => {
  if (timestamps.length >= 2) {
    const [start, end] = startAndEndTime(timestamps);
    return (end - start) / 1000;
  } else {
    return 0;
  }
};

export const startAndEndTime = (timestamps: number[]): [number, number] => {
  if (timestamps.length < 2) {
    return [timestamps[0], timestamps[0]];
  }
  const start = timestamps[0];
  const end = timestamps[timestamps.length - 1];
  return [start, end];
};

const zeroArray = (num: number) => {
  return new Array(num).fill(0);
};
