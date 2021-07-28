import { ScaleTime, ScaleLinear } from 'd3';


export type ScalesTypes = {
  xScale: ScaleTime<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
}

export type WeatherGraphMetadata = {
  xScale: ScaleTime<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
  plotWidth: number;
  plotHeight: number;
  colorLine: string;
};

export type WeatherGraphData = {
  id: number;
  data: {
    value: number;
    date: Date;
  };
  x: number;
  y: number;
};
