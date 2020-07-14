import React, { useState } from 'react';

export enum TimeFrame {
  OTHERS = -1,
  ALL,
  SEC_15 = 15,
  SEC_30 = 30,
  SEC_60 = 60,
  SEC_90 = 90
}

export enum Type {
  START_X,
  END_X
}

type Props = {
  onSelect: (selected: TimeFrame) => void;
  maxWindow: number;
  selected: TimeFrame;
  onChange: (value: number, inputType: Type) => void;
};

export function ChartToolbar(props: Props) {
  const { selected, maxWindow } = props;
  const [minValue, setMinValue] = useState('0');
  const [maValue, setMaxValue] = useState(`${(maxWindow)}`);

  const onSelect = (timeFrame: TimeFrame) => {
    let endValue = parseInt(minValue) + selected;
    if (selected === TimeFrame.ALL) endValue = maxWindow;
    if (timeFrame === TimeFrame.OTHERS) {
      setMaxValue(`${endValue}`);
      props.onChange(endValue, Type.END_X);
    }
    props.onSelect(timeFrame);
  };

  const onChange = (e, inputType: Type) => {
    const value = (e.target.value && parseInt(e.target.value)) || 0;
    const updatedValue = value <= maxWindow ? value : maxWindow;

    props.onChange(updatedValue, inputType);

    if (inputType === Type.START_X) setMinValue(e.target.value);
    if (inputType === Type.END_X) setMaxValue(e.target.value);
  };
  return (
    <div className="toolbar">
      <div className="input-grp">
        <div>
          <label>Start X</label>
          <input
            value={minValue}
            type="number"
            min={0}
            max={maxWindow}
            onChange={(e) => onChange(e, Type.START_X)}
          />
        </div>
        {selected === TimeFrame.OTHERS && (
          <div>
            <label>End X</label>
            <input
              value={maValue}
              type="number"
              min={0}
              max={maxWindow}
              onChange={(e) => onChange(e, Type.END_X)}
            />
          </div>
        )}
      </div>
      <div>
        <button id="15sec" onClick={() => onSelect(TimeFrame.SEC_15)}
                className={selected === TimeFrame.SEC_15 ? 'active' : ''}>
          15s
        </button>
        <button id="30sec" onClick={() => onSelect(TimeFrame.SEC_30)}
                className={selected === TimeFrame.SEC_30 ? 'active' : ''}>
          30s
        </button>
        <button id="60sec" onClick={() => onSelect(TimeFrame.SEC_60)}
                className={selected === TimeFrame.SEC_60 ? 'active' : ''}>
          60s
        </button>
        <button id="90sec" onClick={() => onSelect(TimeFrame.SEC_90)}
                className={selected === TimeFrame.SEC_90 ? 'active' : ''}>
          90s
        </button>
        <button id="all" onClick={() => onSelect(TimeFrame.ALL)} className={selected === TimeFrame.ALL ? 'active' : ''}>
          ALL
        </button>
        <button id="other" onClick={() => onSelect(TimeFrame.OTHERS)}
                className={selected === TimeFrame.OTHERS ? 'active' : ''}>
          Others
        </button>
      </div>
    </div>
  );
}
