import React, { FunctionComponent, createRef, useEffect } from 'react';
import { WeatherGraphMetadata, WeatherGraphData } from 'components/weather-station/weather-data-graphs/types';
import { select, line, axisRight } from 'd3';

type Props = {
  metadata: WeatherGraphMetadata;
  transform?: string;
  tickValues?: number[];
};

const YGrid: FunctionComponent<Props> = (props: Props) => {
  const { tickValues, metadata, transform } = props;
  const gRef = createRef<SVGGElement>();

  useEffect(() => {
    const axis = axisRight(metadata.yScale)
      .tickSizeOuter(0)
      .tickSizeInner(metadata.plotWidth);

    if (tickValues) {
      axis.tickValues(tickValues);
    }

    const node = gRef.current;

    if (node) {
      const parent = select(node);

      parent.classed('y-grid', true)
        .transition()
        .call(axis);

      parent.selectAll('.domain').remove();
      // parent.selectAll('line').remove();
    }
  }, []);

  return (
    <g ref={gRef} transform={transform} style={{ opacity: 0.2 }}/>
  );
};

export default YGrid;
