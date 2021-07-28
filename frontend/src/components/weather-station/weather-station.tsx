import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';

import { getWeatherStationDataAsyncAction } from '../../features/weather-station/actions';
import {
  getHourlyWeatherForecastDataAsyncAction,
  getWeatherForecastDataAsyncAction } from '../../features/weather-forecast/actions';
import WeatherStationHeader from './header/weather-station-header';
import WeatherWarnings from './weather-warnings/weather-warnings';
import WeatherForecastWord from './weather-forecast-word/weather-forecast-word';
import WeatherForecastHourly from './weather-forecast-hourly/weather-forecast-hourly';
import CurrentConditions from './current-conditions/current-conditions';
import Moon from './moon/moon';
import WeatherDataGraphs from './weather-data-graphs/weather-data-graphs';
import DataAge from './data-age/data-age';

type Props = {

};

const WeatherStationComponent: FunctionComponent<Props> = () => {
  useDispatchWeatherData();
  const forecastText = useSelector((state: RootState) => state.weatherForecast.forecastText);

  return (
    <>
      <WeatherStationHeader />
      { forecastText.warning && forecastText.warning.length ? <WeatherWarnings /> : '' }
      <DataAge />
      <CurrentConditions />
      <WeatherForecastWord />
      <WeatherForecastHourly />
      <Moon />
      <WeatherDataGraphs />
    </>
  );
};

export default WeatherStationComponent;

function useDispatchWeatherData() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWeatherStationDataAsyncAction.request({}));
    dispatch(getWeatherForecastDataAsyncAction.request());
    dispatch(getHourlyWeatherForecastDataAsyncAction.request());
  }, [dispatch]);
}
