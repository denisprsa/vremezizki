import React, { FunctionComponent, createRef, useEffect } from 'react';
import { select, line, curveMonotoneX } from 'd3';
import { WeatherGraphMetadata, WeatherGraphData } from 'components/weather-station/weather-data-graphs/types';


type Props = {
  plotData: WeatherGraphData[];
  metadata: WeatherGraphMetadata;
  transform?: string;
};

const Line: FunctionComponent<Props> = (props: Props) => {
  const { plotData, metadata, transform } = props;
  const gRef = createRef<SVGGElement>();

  useEffect(() => {
    const linePath = line<WeatherGraphData>()
      .x(d => d.x)
      .y(d => d.y)
      .curve(curveMonotoneX);

    const node = gRef.current;

    if (node) {
      const parent = select(node);
      parent.selectChildren().remove();
      parent.append('path').classed('valueLine', true);

      const transition = select(node).transition();
      const linePathString = linePath(plotData);

      if (linePathString) {
        transition.select('.valueLine')
          .duration(750)
          .attr('d', linePathString)
          .attr('style', `stroke:${metadata.colorLine};fill:rgba(0,0,0,0);stroke-width:3px;`);
      }
    }
  }, [plotData, metadata]);

  return (
    <g ref={gRef} transform={transform}/>
  );
};

export default Line;
