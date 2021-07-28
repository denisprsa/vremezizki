import React, { FunctionComponent } from 'react';

type Props = {
  className: string;
  value: number;
  maxValue: number;
  angle: number;
  diameter: number;
  fill: string;
  stroke: string;
  innerRadius: number;
  outerRadius: number;
  convexEdge: ConvexEdge;
  onClick: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
  onMouseEnter: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
};

type ConvexEdge = 'both' | 'start' | 'end';

const ArcPath: FunctionComponent<Props> = (props: Props) => {
  const {
    className,
    value,
    maxValue,
    angle,
    diameter,
    fill,
    stroke,
    innerRadius,
    outerRadius,
    convexEdge,
    onClick,
    onMouseEnter } = props;

  const activeAngle = (Number.isNaN(value / maxValue) || ((maxValue / value) === 1)) ? 359.99 : (value / maxValue) * 360;
  const d = path(activeAngle, angle - 90, diameter, innerRadius, outerRadius, convexEdge);

  return (
    <path
      className={className}
      d={d}
      stroke={stroke}
      fill={fill}
      onClick={onClick}
      onMouseEnter={onMouseEnter}>
    </path>
  );
};

export const MemoizedArcPath = React.memo(ArcPath);

export interface ArcPathCoordinates {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function coordinates(halfWidth: number, radius: number, startAngle: number, endAngle: number): ArcPathCoordinates {
  const startAngleDegrees = (Math.PI * startAngle) / 180;
  const x1 = halfWidth + ((halfWidth * radius) * Math.cos(startAngleDegrees));
  const y1 = halfWidth + ((halfWidth * radius) * Math.sin(startAngleDegrees));
  const endAngleDegrees = (Math.PI * endAngle) / 180;
  const x2 = halfWidth + ((halfWidth * radius) * Math.cos(endAngleDegrees));
  const y2 = halfWidth + ((halfWidth * radius) * Math.sin(endAngleDegrees));

  return {x1, y1, x2, y2};
}

export function arc(width: number, radius: number, largeArcFlag: string, x: number, y: number): string {
  const z = (width / 2) * radius;

  return `A${z}, ${z} 0 ${largeArcFlag} ${x}, ${y}`;
}

export function path(activeAngle: number, startAngle: number, width: number, innerRadius: number, outerRadius: number, convexEdge: ConvexEdge): string {
  const endAngle = startAngle + activeAngle;
  const largeArcFlagOuter = activeAngle > 180 ? '1 1' : '0 1';
  const largeArcFlagInner = activeAngle > 180 ? '1 0' : '0 0';
  const halfWidth = width / 2;
  const outerCoords = coordinates(halfWidth, outerRadius, startAngle, endAngle);
  const innerCoords = coordinates(halfWidth, innerRadius, startAngle, endAngle);

  const outerArc = arc(width, outerRadius, largeArcFlagOuter, outerCoords.x2, outerCoords.y2);
  const innerArc = arc(width, innerRadius, largeArcFlagInner, innerCoords.x1, innerCoords.y1);

  const startConvex = convexEdge === 'start' || convexEdge === 'both' ? 1 : 0;
  const endConvex = convexEdge === 'end' || convexEdge === 'both' ? 1 : 0;

  return `M${outerCoords.x1},${outerCoords.y1}
            ${outerArc}
            A 1,1, 0,1,${endConvex}, ${innerCoords.x2},${innerCoords.y2}
            ${innerArc}
            A 1,1 0,1,${startConvex}, ${outerCoords.x1},${outerCoords.y1}`;
}
