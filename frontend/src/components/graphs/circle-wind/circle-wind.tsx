import React, { FunctionComponent, useEffect, useState } from 'react';
import { useProperBackground } from 'layouts/custom-styles';
import * as ArcPath from 'helpers/arc-path';
import { getKeyValue } from 'helpers/general';

type Props = {
  unit: string;
  value: number;
  windDirection: number;
  widthAndHeight: number;
};

type GraphValues = {
  scaleLines: JSX.Element[];
  scaleTexts: JSX.Element[];
  outlineCircle: string;
  direction: string;
  currentValue: string;
};

type AnimateData = {
  minValue: number;
  actualValue: number;
  widthHeight: number;
  windDirection: number;
};

const CircleWindChart: FunctionComponent<Props> = (props: Props) => {
  const classes = useProperBackground();
  const [graphValues, setGraphValues] = useState<GraphValues>({
    scaleLines: [],
    scaleTexts: [],
    outlineCircle: '',
    direction: '',
    currentValue: ''
  });
  const circleAnimation = useAnimation(setGraphValues);

  useEffect(() => {
    circleAnimation({
      minValue: 0,
      actualValue: props.value,
      windDirection: props.windDirection,
      widthHeight: props.widthAndHeight
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="circle-fill-chart" style={{width: `${props.widthAndHeight}px`, height: `${props.widthAndHeight}px`}}>
      <svg className="circle-chart-svg" width={props.widthAndHeight} height={props.widthAndHeight}>
        <g className="circle-chart-scale">
          <g className={classes.circleGraphStroke}>{graphValues.scaleLines}</g>
          <g className={`${classes.strokeFillTextPrimary} circle-scale-text`}>{graphValues.scaleTexts}</g>
        </g>
        <path className={classes.circleGraphFillSecondary} d={graphValues.outlineCircle} transform="translate(20,20)"/>
        <polygon className={classes.circleGraphFillingPrimary} points={graphValues.direction}/>
      </svg>
      <div className="circle-chart-output">
        <div className="circle-chart-value">{graphValues.currentValue}</div>
        <div className="circle-chart-unit">{props.unit}</div>
      </div>
    </div>
  );
};

export default CircleWindChart;

function useAnimation(
  setGraphValues: React.Dispatch<React.SetStateAction<GraphValues>>
) {
  let minValue: number;
  let actualValue: number;
  let windDirection: number;
  let cx: number;
  let cy: number;
  let r1: number;
  let r2: number;
  let startTimestamp: number | undefined;
  let shouldAnimate = true;
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
    const currentAngle = windDirection * getPercentageParametric(percentage);
    const direction = getDirection(currentAngle - 90, r1, r2, cx, cy);
        
    setGraphValues(values => ({
      ...values,
      direction,
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

    minValue = data.minValue;
    actualValue = data.actualValue;
    startTimestamp = undefined;
    windDirection = data.windDirection;

    const parameters = getCircleParameters(data.widthHeight);
    cx = parameters.cx;
    cy = parameters.cy;
    r1 = parameters.r1;
    r2 = parameters.r2;
    const d0 = ArcPath.path(359, startAngle, cx + r1 - circlePadding, innerRadius, outerRadius, 'both');
    const direction = getDirection(-90, r1, r2, cx, cy);
    const { scaleLine, scaleText } = drawScale(r1, r2, cx, cy);
        
    setGraphValues({
      scaleLines: scaleLine,
      scaleTexts: scaleText,
      outlineCircle: d0,
      direction,
      currentValue: minValue.toString(),
    });
  };

  return (data: AnimateData) => {
    initializeData(data);
    window.requestAnimationFrame(animate);
  };
}

function getDirection(direction: number, r1: number, r2: number, cx: number, cy: number): string {
  const rad = Math.PI / 180;
  const dr1 = r1 + 1;
  const dr2 = r2 - 12;
  const dr3 = r1 + 1;
  const dr4 = r1 - 7;
  const dx2 = cx + dr2 * Math.cos(direction * rad);
  const dy2 = cy + dr2 * Math.sin(direction * rad);
  const dx1 = cx + dr1 * Math.cos((direction - 10) * rad);
  const dy1 = cy + dr1 * Math.sin((direction - 10) * rad);
  const dx3 = cx + dr3 * Math.cos((direction + 10) * rad);
  const dy3 = cy + dr3 * Math.sin((direction + 10) * rad);
  const dx4 = cx + dr4 * Math.cos(direction * rad);
  const dy4 = cy + dr4 * Math.sin(direction * rad);

  return `${dx1},${dy1} ${dx2},${dy2} ${dx3},${dy3} ${dx4},${dy4}`;
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

function drawScale(r1: number, r2: number, cx: number, cy: number) {
  const rad = Math.PI / 180;
  const sr1 = r1 + 1;
  const sr2 = r2 - 5;
  const srT = r1 + 10;

  const scaleLine: {x1: number; y1: number; x2: number; y2: number;}[] = [];
  const scaleText: {x: number; y: number; text: string}[] = [];
  const directions: {[key: number]: string} = {
    0: 'S',
    45: 'SV',
    90: 'V',
    135: 'JV',
    180: 'J',
    225: 'JZ',
    270: 'Z',
    315: 'SZ'
  };

  let n = 0;
  for (let sa = -90; sa <= 360 - 90; sa += 45) {
    const sx1 = cx + sr1 * Math.cos(sa * rad);
    const sy1 = cy + sr1 * Math.sin(sa * rad);
    const sx2 = cx + sr2 * Math.cos(sa * rad);
    const sy2 = cy + sr2 * Math.sin(sa * rad);
    const sxT = cx + srT * Math.cos(sa * rad);
    const syT = cy + srT * Math.sin(sa * rad);

    scaleLine.push({ x1: sx1, x2: sx2, y1: sy1, y2: sy2});
    scaleText.push({ x: sxT, y: syT, text: getKeyValue(directions)(n)});

    n += 45;
  }

  const scaleLineItems = scaleLine.map((val, index) => 
    <line key={`line-${index}`} className="circle-chart-scale-item" x1={val.x1} x2={val.x2} y1={val.y1} y2={val.y2} />);

  const scaleTextItems = scaleText.map((val, index) =>
    <text key={`text-${index}`} className="circle-chart-scale-item" x={val.x} y={val.y}>{val.text}</text>);

  return {
    scaleLine: scaleLineItems,
    scaleText: scaleTextItems
  };
}
