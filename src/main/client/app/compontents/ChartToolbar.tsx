import React, { useState } from 'react';

export enum TimeFrame {
  ALL,
  SEC_15 = 15,
  SEC_30 = 30,
  SEC_60 = 60,
  SEC_90 = 90
}

type Props = {
  onSelect: (selected: TimeFrame) => void;
  maxWindow: number;
  selected: TimeFrame;
  onChange: (value: number) => void;
};

export function ChartToolbar(props: Props) {
  const { selected, maxWindow, onSelect, onChange } = props;
  const [value, setValue] = useState('0');
  return (
    <div className="toolbar">
      <div>
        <label>Start X</label>
        <input
          value={value}
          type="number"
          min={0}
          max={maxWindow}
          onChange={e => {
            const value = (e.target.value && parseInt(e.target.value)) || 0;
            const updatedValue = value <= maxWindow ? value : maxWindow;
            onChange(updatedValue);
            setValue(e.target.value);
          }}
        />
      </div>
      <div>
        <button id="15sec" onClick={() => onSelect(TimeFrame.SEC_15)} className={selected === TimeFrame.SEC_15 ? 'active' : ''}>
          15s
        </button>
        &nbsp;
        <button id="30sec" onClick={() => onSelect(TimeFrame.SEC_30)} className={selected === TimeFrame.SEC_30 ? 'active' : ''}>
          30s
        </button>
        &nbsp;
        <button id="60sec" onClick={() => onSelect(TimeFrame.SEC_60)} className={selected === TimeFrame.SEC_60 ? 'active' : ''}>
          60s
        </button>
        &nbsp;
        <button id="90sec" onClick={() => onSelect(TimeFrame.SEC_90)} className={selected === TimeFrame.SEC_90 ? 'active' : ''}>
          90s
        </button>
        &nbsp;
        <button id="all" onClick={() => onSelect(TimeFrame.ALL)} className={selected === TimeFrame.ALL ? 'active' : ''}>
          ALL
        </button>
      </div>
    </div>
  );
}
