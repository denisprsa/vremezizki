import React, { FunctionComponent, createRef } from 'react';
import { WeatherGraphMetadata, WeatherGraphData } from 'components/weather-station/weather-data-graphs/types';
import Circle from 'components/weather-station/weather-data-graphs/data-circle';

type Props = {
  plotData: WeatherGraphData[];
  metadata: WeatherGraphMetadata;
  transform?: string;
};

const ScatterPlot: FunctionComponent<Props> = (props: Props) => {
  const { plotData, metadata, transform } = props;
  const gRef = createRef<SVGGElement>();


  return (
    <g ref={gRef} transform={transform}>
      {
        plotData.map((value, index) => 
          <Circle key={index}
            coords={value}
            fillColor={metadata.colorLine}
            radius={2}/>
        )
      }
    </g>
  );
};

export default ScatterPlot;
