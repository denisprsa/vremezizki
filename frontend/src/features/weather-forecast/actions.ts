import { createAsyncAction } from 'typesafe-actions';
import {
  WeatherForecastResponseData,
  HourlyWeatherForecastResponseData } from './interfaces';

export const getWeatherForecastDataAsyncAction = createAsyncAction(
  'weatherForecast/get/request',
  'weatherForecast/get/success',
  'weatherForecast/get/failure'
)<undefined, WeatherForecastResponseData, string>();

export const getHourlyWeatherForecastDataAsyncAction = createAsyncAction(
  'hourlyWeatherForecast/get/request',
  'hourlyWeatherForecast/get/success',
  'hourlyWeatherForecast/get/failure'
)<undefined, HourlyWeatherForecastResponseData, string>();
