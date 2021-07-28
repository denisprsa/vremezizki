import React, { FunctionComponent } from 'react';
import { ReactSVG } from 'react-svg';

import './min-max-current-values.scss';

type ValueProps = {
  value: number;
  iconPath: string;
  unit: string;
  loading: boolean;
};

const Value = (props: ValueProps) => (
  <div className="min-max-current-value-item">
    <div className="min-max-current-value__icon">
      <ReactSVG src={props.iconPath} />
    </div>
    <div className="min-max-current-value__info">
      <div className="min-max-current-value__number">
        { props.loading && '--' }
        { !props.loading && props.value }
      </div>
      <div className="min-max-current-value__unit">
        { props.unit }
      </div>
    </div>
  </div>
);

type Props = {
  loading: boolean;
  min?: number;
  max?: number;
  current?: number;
  minIcon?: string;
  maxIcon?: string;
  currentIcon?: string;
  unit: string;
};

const MinMaxCurrentValues: FunctionComponent<Props> = (props: Props) => {
  let currentValue;
  let maxValue;
  let minValue;

  if (props.current !== undefined && !isNaN(props.current) && props.currentIcon) {
    currentValue = <Value unit={props.unit} value={props.current} iconPath={props.currentIcon} loading={props.loading}/>;
  }

  if (props.max !== undefined && !isNaN(props.max) && props.maxIcon) {
    maxValue = <Value unit={props.unit} value={props.max} iconPath={props.maxIcon} loading={props.loading}/>;
  }

  if (props.min !== undefined && !isNaN(props.min) && props.minIcon) {
    minValue = <Value unit={props.unit} value={props.min} iconPath={props.minIcon} loading={props.loading}/>;
  }

  return (
    <div className="min-max-current-value-wrapper">
      { currentValue }
      { maxValue }
      { minValue }
    </div>
  );
};


export default MinMaxCurrentValues;
