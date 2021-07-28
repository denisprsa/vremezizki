import React, { FunctionComponent } from 'react';

type Props = {
  coords: {
    x: number,
    y: number
  },
  className?: string,
  fillColor: string,
  radius: number
};

const Circle: FunctionComponent<Props> = (props: Props) => {
  const { coords, className, fillColor, radius } = props;

  return (
    <circle
      className={className}
      cx={coords.x}
      cy={coords.y}
      r={radius}
      fill={fillColor}/>
  );
};

export default Circle;
