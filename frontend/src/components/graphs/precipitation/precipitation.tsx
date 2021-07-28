import React, { FunctionComponent, useEffect, useState } from 'react';
import { useProperBackground } from 'layouts/custom-styles';
import * as ArcPath from 'helpers/arc-path';

import './precipitation.scss';

type Props = {
  unit: string;
  value: number;
  widthAndHeight: number;
};

type GraphValues = {
  outlineCircle: string;
  currentValue: string;
  rainAnimation: JSX.Element | undefined;
  innerWidth: number;
};

type AnimateData = {
  widthHeight: number;
  currentValue: number;
};

const PrecipitationGraph: FunctionComponent<Props> = (props: Props) => {
  const classes = useProperBackground();
  const [graphValues, setGraphValues] = useState<GraphValues>({
    outlineCircle: '',
    currentValue: '',
    rainAnimation: undefined,
    innerWidth: 0
  });
  const circleAnimation = useAnimation(setGraphValues);

  useEffect(() => {
    circleAnimation({
      widthHeight: props.widthAndHeight,
      currentValue: props.value
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="rain-chart" style={{height: '195px', width: '195px'}}>
      <div className="rain-chart-rain-animation" style={{top: `calc(50% - ${graphValues.innerWidth / 2}px)`, left: `calc(50% - ${Math.round(graphValues.innerWidth / 2)}px)`}}>
        <div className="rain-chart-rain-animation-wrapper" style={{width: graphValues.innerWidth, height: graphValues.innerWidth}}>
          <svg className="rain-chart-animation-svg" height={props.widthAndHeight} width={props.widthAndHeight} view-box="0 0 330 165">
            <g className={classes.circleGraphFillingPrimary}>
              {graphValues.rainAnimation}
            </g>
          </svg>
        </div>
      </div>

      <svg className="rain-chart-svg" width={props.widthAndHeight} height={props.widthAndHeight}>
        <path className={classes.circleGraphFillSecondary} d={graphValues.outlineCircle} transform="translate(20,20)"/>
      </svg>

      <div className="rain-chart-output">
        <div className="rain-chart-value">{graphValues.currentValue}</div>
        <div className="rain-chart-unit">{props.unit}</div>
      </div>
    </div>
  );
};

export default PrecipitationGraph;


function useAnimation(
  setGraphValues: React.Dispatch<React.SetStateAction<GraphValues>>
) {
  let actualValue: number;
  let cx: number;
  let r1: number;
  let startTimestamp: number | undefined;
  let shouldAnimate = true;
  const minValue = 0;
  const circlePadding = 20;
  const innerRadius = 0.75;
  const outerRadius = 0.97;
  const startAngle = -90;
  const maxTime = 2000;

  useEffect(() => {
    return () => { shouldAnimate = false; };
  }, []);

  // Used to animate circle filling graph
  const animate = (timestamp: number) => {
    if (shouldAnimate == false) {
      return;
    }
    
    if (startTimestamp === undefined) {
      startTimestamp = timestamp;
    }

    const elapsed = timestamp - startTimestamp;
    let percentage = elapsed / maxTime ;
    percentage = percentage > 1 ? 1 : percentage;

    const minToActualValueDifference = (actualValue - minValue);
    const currentFrameValue = (minToActualValueDifference * getPercentageParametric(percentage)) + minValue;

    setGraphValues(values => ({
      ...values,
      currentValue: currentFrameValue.toFixed(1).toString() 
    }));

    if (elapsed < maxTime) {
      window.requestAnimationFrame(animate);
    }
  };

  // Initialize data on every run in case values change
  const initializeData = (data: AnimateData) => {
    if (shouldAnimate == false) {
      return;
    }

    const parameters = getCircleParameters(data.widthHeight);
    actualValue = data.currentValue;
    cx = parameters.cx;
    r1 = parameters.r1;

    const d0 = ArcPath.path(359, startAngle, cx + r1 - circlePadding, innerRadius, outerRadius, 'both');
    let rainAnimation: JSX.Element | undefined = undefined;

    if (data.currentValue > 0) {
      rainAnimation = getRainWaveElement();
    }
        
    setGraphValues({
      rainAnimation,
      outlineCircle: d0,
      currentValue: minValue.toString(),
      innerWidth: (cx + r1 - circlePadding) * innerRadius
    });
  };

  return (data: AnimateData) => {
    initializeData(data);
    window.requestAnimationFrame(animate);
  };
}

function getRainWaveElement() {
  return (
    <g className="rain-chart-wave-shape-fill">
      <path className="rain-chart-wave-shape" d="M300,100V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4
                c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9
                c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V100H300z" />
    </g>
  );
}

function getPercentageParametric(t: number): number {
  const sqt = t * t;
  return sqt / (2 * (sqt - t) + 1);
}

function getCircleParameters(widthAndHeight: number) {
  const cx = Math.floor(widthAndHeight / 2);
  const cy = Math.floor(widthAndHeight / 2);
  const offset = 20;
  const r1 = cx - offset;
  const delta = Math.floor(r1 / 4);
  const r2 = r1 - delta;
   
  return {
    cx,
    cy,
    r1,
    r2
  };
}
