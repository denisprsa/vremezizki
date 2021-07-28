import React, { FunctionComponent, useEffect, useState } from 'react';
import { ScaleLine, ScaleText } from 'interfaces/types';
import { useProperBackground } from 'layouts/custom-styles';
import * as ArcPath from 'helpers/arc-path';

type Props = {
  unit: string;
  minValue: number;
  value: number;
  maxValue: number;
  widthAndHeight: number;
};

type GraphValues = {
  scaleLines: JSX.Element[];
  scaleTexts: JSX.Element[];
  outlineCircle: string;
  needle: string;
  currentValue: string;
  circleX: number;
  circleY: number;
};

type AnimateData = {
  minValue: number;
  actualValue: number;
  maxValue: number;
  widthHeight: number;
};

const CirclePointerGaugeChart: FunctionComponent<Props> = (props: Props) => {
  const classes = useProperBackground();
  const [graphValues, setGraphValues] = useState<GraphValues>({
    scaleLines: [],
    scaleTexts: [],
    outlineCircle: '',
    needle: '',
    currentValue: '',
    circleX: 0,
    circleY: 0
  });
  const circleAnimation = useAnimation(setGraphValues);

  useEffect(() => {
    circleAnimation({
      minValue: props.minValue,
      actualValue: props.value,
      maxValue: props.maxValue,
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
        <polygon className={classes.circleGraphFillingPrimary} points={graphValues.needle}/>
        <circle className={classes.gaugeCircle} cx={graphValues.circleX} cy={graphValues.circleY} r="40" strokeWidth="3" />
      </svg>
      <div className="circle-chart-output">
        <div className="circle-chart-value">{graphValues.currentValue}</div>
        <div className="circle-chart-unit">{props.unit}</div>
      </div>
    </div>
  );
};

export default CirclePointerGaugeChart;

function useAnimation(
  setGraphValues: React.Dispatch<React.SetStateAction<GraphValues>>
) {
  let minValue: number;
  let actualValue: number;
  let maxValue: number;
  let cx: number;
  let cy: number;
  let r1: number;
  let startTimestamp: number | undefined;
  let shouldAnimate = true;
  const circlePadding = 20;
  const innerRadius = 0.75;
  const outerRadius = 0.97;
  const startAngle = 120;
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
    const currentAngle = calculateA(cx, cy, r1, minValue, maxValue, currentFrameValue);
    const needle = getNeedle(cx, cy, r1, currentAngle);
        
    setGraphValues(values => ({
      ...values,
      needle,
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
    maxValue = data.maxValue;
    startTimestamp = undefined;

    const parameters = getCircleParameters(data.widthHeight);
    cx = parameters.cx;
    cy = parameters.cy;
    r1 = parameters.r1;
    const r2 = parameters.r2;
    const d0 = ArcPath.path(300, startAngle, cx + r1 - circlePadding, innerRadius, outerRadius, 'both');
    const a = calculateA(cx, cy, r1, minValue, maxValue, actualValue);
    const needle = getNeedle(cx, cy, r1, a);
    const scaleTickDelta = (maxValue - minValue) / 10;
    const { scaleLine, scaleText } = drawScale(r1, r2, cx, cy, minValue, scaleTickDelta);
        
    setGraphValues({
      scaleLines: scaleLine,
      scaleTexts: scaleText,
      outlineCircle: d0,
      needle,
      currentValue: minValue.toString(),
      circleX: data.widthHeight / 2,
      circleY: data.widthHeight / 2
    });
  };

  return (data: AnimateData) => {
    initializeData(data);
    window.requestAnimationFrame(animate);
  };
}

function calculateA(cx: number, cy: number, r1: number, minValue: number, maxValue: number, actualValue: number): number {
  const difference = maxValue - minValue;
  const currentValueNormalized = actualValue - minValue;
  const currentPercentage = currentValueNormalized / difference;
  const percentageHalfNeedleOffset = 0;
  const scalePosition = 300 * currentPercentage + percentageHalfNeedleOffset;
  const rad = Math.PI / 180;
  const pa = scalePosition + 60;
  const x = cx + r1 * Math.cos(pa * rad);
  const y = cy + r1 * Math.sin(pa * rad);
  const lx = cx - x;
  const ly = cy - y;

  return Math.atan2(ly, lx) / rad - 120;
}

function getNeedle(cx: number, cy: number, r1: number, a: number): string {
  const rad = Math.PI / 180;
  const nx1 = cx + 10 * Math.cos((a - 150) * rad);
  const ny1 = cy + 10 * Math.sin((a - 150) * rad);

  const nx21 = cx + (r1 + 0) * Math.cos((a - 3) * rad);
  const ny21 = cy + (r1 + 0) * Math.sin((a - 3) * rad);

  const nx22 = cx + (r1 + 15) * Math.cos((a + 0) * rad);
  const ny22 = cy + (r1 + 15) * Math.sin((a + 0) * rad);

  const nx23 = cx + (r1 + 0) * Math.cos((a + 3) * rad);
  const ny23 = cy + (r1 + 0) * Math.sin((a + 3) * rad);

  const nx3 = cx + 10 * Math.cos((a + 150) * rad);
  const ny3 = cy + 10 * Math.sin((a + 150) * rad);

  return `${nx1},${ny1} ${nx21},${ny21} ${nx22},${ny22} ${nx23},${ny23} ${nx3},${ny3}`;
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

function drawScale(r1: number, r2: number, cx: number, cy: number, minValue: number, delta: number) {
  const rad = Math.PI / 180;
  const sr1 = r1 + 1;
  const sr2 = r2 - 0;
  const srT = r1 + 10;

  const scaleLine: ScaleLine[] = [];
  const scaleText: ScaleText[] = [];

  for (let sa = -240; sa <= 60; sa += 30) {
    const sx1 = cx + sr1 * Math.cos(sa * rad);
    const sy1 = cy + sr1 * Math.sin(sa * rad);
    const sx2 = cx + sr2 * Math.cos(sa * rad);
    const sy2 = cy + sr2 * Math.sin(sa * rad);
    const sxT = cx + srT * Math.cos(sa * rad);
    const syT = cy + srT * Math.sin(sa * rad);

    scaleLine.push({ x1: sx1, x2: sx2, y1: sy1, y2: sy2});
    scaleText.push({ x: sxT, y: syT, text: minValue.toFixed(0)});

    minValue += delta;
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
