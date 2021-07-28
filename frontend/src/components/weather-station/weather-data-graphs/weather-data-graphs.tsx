import React, { FunctionComponent, useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { RootState } from 'StoreTypes';
import { useContainerStyles, useWeatherGraphStyles } from 'layouts/custom-styles';
import { ScalesTypes, WeatherGraphMetadata, WeatherGraphData } from 'components/weather-station/weather-data-graphs/types';
import { scaleTime, scaleLinear, extent } from 'd3';
import Line from 'components/weather-station/weather-data-graphs/line-plot';
import ScatterPlot from 'components/weather-station/weather-data-graphs/scatter-plot';
import YAxis from 'components/weather-station/weather-data-graphs/y-axis';
import { KeyboardDateTimePicker } from '@material-ui/pickers';

import './weather-data-graphs.scss';

type WeatherLineGraphInfo = {
  weatherGraphMetadata: WeatherGraphMetadata;
  weatherGraphData: WeatherGraphData[];
};

type Props = {

}

const WeatherDataGraphs: FunctionComponent<Props> = () => {
  const containerClasses = useContainerStyles();
  const weatherGraphClasses = useWeatherGraphStyles();

  const { isLoadingWeatherData, weatherDataGraph } = useSelector((state: RootState) => ({
    isLoadingWeatherData: state.weatherStation.isLoadingWeatherData,
    weatherDataGraph: state.weatherStation.weatherDataGraph
  }));

  const temperatureColor = '#d5202a';
  const dewPointColor = '#5b9f49';
  const humidityColor = '#87c404';
  const windSpeedColor = '#4287e4';
  const windGustsColor = '#f83';
  const windDirectionColor = '#ae007c';
  const rainColor = '#0053ae';
  const pressureColor = '#1e2023';

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [graphWidth, setGraphWidth] = useState<number>(0);
  const [graphHeight, setGraphHeight] = useState<number>(0);
  const [plotHeight, setPlotHeight] = useState<number>(200);

  const [temperaturePlot, setTemperaturePlot] = useState<WeatherLineGraphInfo | null>(null);
  const [dewPointPlot, setDewPointPlot] = useState<WeatherLineGraphInfo | null>(null);
  const [humidityPlotData, setHumidityPlotData] = useState<WeatherLineGraphInfo | null>(null);
  const [windSpeedPlotData, setWindSpeedPlotData] = useState<WeatherLineGraphInfo | null>(null);
  const [windGustPlotData, setWindGustPlotData] = useState<WeatherLineGraphInfo | null>(null);
  const [windDirectionPlotData, setWindDirectionPlotData] = useState<WeatherLineGraphInfo | null>(null);
  const [rainPlotData, setRainPlotData] = useState<WeatherLineGraphInfo | null>(null);
  const [pressurePlotData, setPressurePlotData] = useState<WeatherLineGraphInfo | null>(null);

  const graphContainerRef = useRef<HTMLDivElement>(null);

  const marginTopBetweenGraphs = 30;
  const marginFirstAndLastGraph = 20;

  const getYDomain = useCallback((data: number[], offsetMin = 0, offsetMax = 0) => {
    return [
      Math.min(...data) - offsetMin,
      Math.max(...data) + offsetMax
    ];
  }, []);

  const calculateScale = useCallback((date: Date[], scalesNice: number, yDomain: number[]) => {
    console.log(plotHeight);
    const xScale = scaleTime<number, number>();
    const yScale = scaleLinear().nice(scalesNice);

    const xDomain = extent(date, d => d) as [Date, Date];

    xScale.domain(xDomain);
    xScale.range([0, graphWidth]);

    yScale.domain(yDomain);
    yScale.ticks(scalesNice);
    yScale.range([plotHeight, 0]);

    return { xScale, yScale };
  }, [graphWidth, plotHeight]);

  const getMetadata = useCallback((scale: ScalesTypes, colorLine: string) => ({
    xScale: scale.xScale,
    yScale: scale.yScale,
    plotWidth: graphWidth,
    plotHeight: plotHeight,
    colorLine: colorLine
  }), [graphWidth, plotHeight]);

  const getPlotData = useCallback((date: Date[], data: number[], scale: ScalesTypes) => {
    return data.map((value, index) => ({
      id: index,
      data: { value: value, date: date[index] },
      x: scale.xScale(date[index]),
      y: scale.yScale(value)
    }));
  }, []);

  const calculateGraphData = useCallback(() => {
    if (isLoadingWeatherData) {
      return;
    }

    const temperatureDomain = getYDomain(weatherDataGraph.temperature);
    const dewPointDomain = getYDomain(weatherDataGraph.dewPoint);
    const tempDewPointDomain = [
      Math.floor(Math.min(temperatureDomain[0], dewPointDomain[0]) - 3),
      Math.round(Math.max(temperatureDomain[1], dewPointDomain[1]) + 3)
    ];

    console.log(tempDewPointDomain);
    const temperatureScale = calculateScale(weatherDataGraph.date, 5, tempDewPointDomain);
    const temperatureMetadata = getMetadata(temperatureScale, temperatureColor);
    const dewPointMetadata = getMetadata(temperatureScale, dewPointColor);
    const temperaturePlotData = getPlotData(weatherDataGraph.date, weatherDataGraph.temperature, temperatureScale);
    const dewPointPlotData = getPlotData(weatherDataGraph.date, weatherDataGraph.dewPoint, temperatureScale);

    setTemperaturePlot({ weatherGraphMetadata: temperatureMetadata, weatherGraphData: temperaturePlotData });
    setDewPointPlot({ weatherGraphMetadata: dewPointMetadata, weatherGraphData: dewPointPlotData });

    const humidityDomain = getYDomain(weatherDataGraph.humidity, 10, 10);
    humidityDomain[1] = 100;
    const humidityScale = calculateScale(weatherDataGraph.date, 5, humidityDomain);
    const humidityMetadata = getMetadata(humidityScale, humidityColor);
    const humidityPlotData = getPlotData(weatherDataGraph.date, weatherDataGraph.humidity, humidityScale);

    setHumidityPlotData({ weatherGraphMetadata: humidityMetadata, weatherGraphData: humidityPlotData });

    const windSpeedDomain = getYDomain(weatherDataGraph.windSpeed);
    const windGustDomain = getYDomain(weatherDataGraph.windGust);
    const windSpeedGustDomain = [
      0,
      Math.max(windSpeedDomain[1], windGustDomain[1] + 2)
    ];
    const windSpeedScale = calculateScale(weatherDataGraph.date, 5, windSpeedGustDomain);
    const windSpeedMetadata = getMetadata(windSpeedScale, windSpeedColor);
    const windSpeedPlotData = getPlotData(weatherDataGraph.date, weatherDataGraph.windSpeed, windSpeedScale);
    const windGustScale = calculateScale(weatherDataGraph.date, 5, windSpeedGustDomain);
    const windGustMetadata = getMetadata(windGustScale, windGustsColor);
    const windGustPlotData = getPlotData(weatherDataGraph.date, weatherDataGraph.windGust, windGustScale);

    setWindSpeedPlotData({ weatherGraphMetadata: windSpeedMetadata, weatherGraphData: windSpeedPlotData });
    setWindGustPlotData({ weatherGraphMetadata: windGustMetadata, weatherGraphData: windGustPlotData });

    const windDirectionDomain = [0, 360];
    const windDirectionScale = calculateScale(weatherDataGraph.date, 5, windDirectionDomain);
    const windDirectionMetadata = getMetadata(windDirectionScale, windDirectionColor);
    const windDirectionPlotData = getPlotData(weatherDataGraph.date, weatherDataGraph.windDirection, windDirectionScale);

    setWindDirectionPlotData({ weatherGraphMetadata: windDirectionMetadata, weatherGraphData: windDirectionPlotData });

    const rainDomain = getYDomain(weatherDataGraph.rain, 0, 3);
    const rainScale = calculateScale(weatherDataGraph.date, 5, rainDomain);
    const rainMetadata = getMetadata(rainScale, rainColor);
    const rainPlotData = getPlotData(weatherDataGraph.date, weatherDataGraph.rain, rainScale);

    setRainPlotData({ weatherGraphMetadata: rainMetadata, weatherGraphData: rainPlotData });

    const pressureDomain = getYDomain(weatherDataGraph.pressure, 5, 5);
    const pressureScale = calculateScale(weatherDataGraph.date, 5, pressureDomain);
    const pressureMetadata = getMetadata(pressureScale, pressureColor);
    const pressurePlotData = getPlotData(weatherDataGraph.date, weatherDataGraph.pressure, pressureScale);

    setPressurePlotData({ weatherGraphMetadata: pressureMetadata, weatherGraphData: pressurePlotData });
  }, [isLoadingWeatherData, weatherDataGraph, getYDomain, calculateScale, getMetadata, getPlotData]);

  const handleDateChange = useCallback((date: Date) => {
    console.log(date);
    setSelectedDate(date);
  }, []);

  useEffect(() => {
    calculateGraphData();
  }, [isLoadingWeatherData, weatherDataGraph, calculateGraphData, graphWidth, plotHeight, graphHeight]);

  useEffect(() => {
    const onResize = () => {
      if (graphContainerRef.current) {
        const width = graphContainerRef.current.clientWidth;
        setGraphWidth(width);
        setPlotHeight(200);
        setGraphHeight(200 * 6 + marginFirstAndLastGraph * 2 + marginTopBetweenGraphs * 5);
      }
    };

    window.addEventListener('resize', onResize);
    onResize();

    return () => window.removeEventListener('resize', onResize);
  }, [isLoadingWeatherData, weatherDataGraph, calculateGraphData]);

  const calculateMarginForGraph = (plotIndex: number) => {
    return plotHeight * plotIndex + marginFirstAndLastGraph + marginTopBetweenGraphs * plotIndex;
  };

  return (
    <Box mt={2}>
      <Container fixed>
        <Grid container className={`${containerClasses.root}`} ref={graphContainerRef}>
          <Grid item xs={12}>
            <div className="data-graph-controls">
              <div>
                Prejsnji dan
              </div>
              <div>
                <KeyboardDateTimePicker
                  disableFuture
                  ampm={false}
                  label="Izberi datum"
                  variant="inline"
                  format="dd.MM.yyyy HH:mm"
                  value={selectedDate}
                  onChange={handleDateChange} />
              </div>
              <div>
                Naslednji dan
              </div>
            </div>

            <svg className="svg-wrapper" width={graphWidth} height={graphHeight}>
              {
                // Temperature and dew point
              }
              <rect className={`${weatherGraphClasses.rect}`}
                width={graphWidth}
                height={plotHeight}
                transform={`translate(0, ${marginFirstAndLastGraph})`} />
              {
                // temperaturePlot && <YGrid
                //     metadata={temperaturePlot.weatherGraphMetadata}
                //     transform="translate(0, 20)"/>
              }
              {
                temperaturePlot && <Line
                  plotData={temperaturePlot.weatherGraphData}
                  metadata={temperaturePlot.weatherGraphMetadata}
                  transform="translate(0,20)" />
              }
              {
                dewPointPlot && <Line
                  plotData={dewPointPlot.weatherGraphData}
                  metadata={dewPointPlot.weatherGraphMetadata}
                  transform="translate(0,20)" />
              }
              {
                temperaturePlot && <YAxis
                  metadata={temperaturePlot.weatherGraphMetadata}
                  transform="translate(30,20)" />
              }

              {
                // Humidity
              }
              <rect width={graphWidth}
                height={plotHeight}
                className={`${weatherGraphClasses.rect}`}
                transform={`translate(0, ${calculateMarginForGraph(1)})`} />
              {
                // humidityPlotData && <YGrid
                //     metadata={humidityPlotData.weatherGraphMetadata}
                //     transform={`translate(0, ${calculateMarginForGraph(1)})`}/>
              }
              {
                // Humidity line
                humidityPlotData && <Line
                  plotData={humidityPlotData.weatherGraphData}
                  metadata={humidityPlotData.weatherGraphMetadata}
                  transform={`translate(0, ${calculateMarginForGraph(1)})`} />
              }
              {
                humidityPlotData && <YAxis
                  metadata={humidityPlotData.weatherGraphMetadata}
                  transform={`translate(30, ${calculateMarginForGraph(1)})`} />
              }

              {
                // Wind
              }
              <rect width={graphWidth}
                height={plotHeight}
                className={`${weatherGraphClasses.rect}`}
                transform={`translate(0, ${calculateMarginForGraph(2)})`} />
              {
                // windSpeedPlotData && <YGrid
                //     metadata={windSpeedPlotData.weatherGraphMetadata}
                //     transform={`translate(0, ${calculateMarginForGraph(2)})`}/>
              }
              {
                // Wind speed line
                windSpeedPlotData && <Line
                  plotData={windSpeedPlotData.weatherGraphData}
                  metadata={windSpeedPlotData.weatherGraphMetadata}
                  transform={`translate(0, ${calculateMarginForGraph(2)})`} />
              }
              {
                // Wind gusts line
                windGustPlotData && <ScatterPlot
                  plotData={windGustPlotData.weatherGraphData}
                  metadata={windGustPlotData.weatherGraphMetadata}
                  transform={`translate(0, ${calculateMarginForGraph(2)})`} />
              }
              {
                windGustPlotData && <YAxis
                  metadata={windGustPlotData.weatherGraphMetadata}
                  transform={`translate(30, ${calculateMarginForGraph(2)})`} />
              }


              {
                // Wind direction
              }
              <rect width={graphWidth}
                height={plotHeight}
                className={`${weatherGraphClasses.rect}`}
                transform={`translate(0, ${calculateMarginForGraph(3)})`} />
              {
                // windDirectionPlotData && <YGrid
                //     tickValues={[0,60,120,180,240,300,360]}
                //     metadata={windDirectionPlotData.weatherGraphMetadata}
                //     transform={`translate(0, ${calculateMarginForGraph(3)})`}/>
              }
              {
                // Wind direction line
                windDirectionPlotData && <ScatterPlot
                  plotData={windDirectionPlotData.weatherGraphData}
                  metadata={windDirectionPlotData.weatherGraphMetadata}
                  transform={`translate(0, ${calculateMarginForGraph(3)})`} />
              }
              {
                windDirectionPlotData && <YAxis
                  metadata={windDirectionPlotData.weatherGraphMetadata}
                  transform={`translate(30, ${calculateMarginForGraph(3)})`}
                  tickValues={[0, 60, 120, 180, 240, 300, 360]} />
              }


              {
                // Rain
              }
              <rect width={graphWidth}
                height={plotHeight}
                className={`${weatherGraphClasses.rect}`}
                transform={`translate(0, ${calculateMarginForGraph(4)})`} />
              {
                // rainPlotData && <YGrid
                //     metadata={rainPlotData.weatherGraphMetadata}
                //     transform={`translate(0, ${calculateMarginForGraph(4)})`}/>
              }
              {
                // Rain line
                rainPlotData && <Line
                  plotData={rainPlotData.weatherGraphData}
                  metadata={rainPlotData.weatherGraphMetadata}
                  transform={`translate(0, ${calculateMarginForGraph(4)})`} />
              }
              {
                rainPlotData && <YAxis
                  metadata={rainPlotData.weatherGraphMetadata}
                  transform={`translate(30, ${calculateMarginForGraph(4)})`} />
              }

              {
                // Pressure
              }
              <rect width={graphWidth}
                height={plotHeight}
                className={`${weatherGraphClasses.rect}`}
                transform={`translate(0, ${calculateMarginForGraph(5)})`} />
              {
                // pressurePlotData && <YGrid
                //     metadata={pressurePlotData.weatherGraphMetadata}
                //     transform={`translate(0, ${calculateMarginForGraph(5)})`}/>
              }
              {
                // Pressure line
                pressurePlotData && <Line
                  plotData={pressurePlotData.weatherGraphData}
                  metadata={pressurePlotData.weatherGraphMetadata}
                  transform={`translate(0, ${calculateMarginForGraph(5)})`} />
              }
              {
                pressurePlotData && <YAxis
                  metadata={pressurePlotData.weatherGraphMetadata}
                  transform={`translate(35, ${calculateMarginForGraph(5)})`} />
              }
            </svg>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WeatherDataGraphs;
