import React, { FunctionComponent, createRef, useEffect } from 'react';
import { WeatherGraphMetadata, WeatherGraphData } from 'components/weather-station/weather-data-graphs/types';
import { select, line, axisLeft } from 'd3';

type Props = {
  metadata: WeatherGraphMetadata;
  transform?: string;
  tickValues?: number[];
};

const YAxis: FunctionComponent<Props> = (props: Props) => {
  const { tickValues, metadata, transform } = props;
  const gRef = createRef<SVGGElement>();

  useEffect(() => {
    const axis = axisLeft(metadata.yScale);

    if (tickValues) {
      axis.tickValues(tickValues);
    }

    axis.tickFormat(d => String(d));

    const node = gRef.current;

    if (node) {
      const parent = select(node);

      parent.classed('y-axis', true)
        .transition()
        .call(axis);

      parent.selectAll('.domain').remove();
      parent.selectAll('line').remove();
    }
  }, []);

  return (
    <g ref={gRef} transform={transform} />
  );
};

export default YAxis;
