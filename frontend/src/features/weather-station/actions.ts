import { createAsyncAction } from 'typesafe-actions';
import { WeatherStationData, WeatherDataRequestParameters } from './interfaces';

export const getWeatherStationDataAsyncAction = createAsyncAction(
  'weatherStation/data/get/request',
  'weatherStation/data/get/success',
  'weatherStation/data/get/failure'
)<WeatherDataRequestParameters, { data: WeatherStationData[], parameters: WeatherDataRequestParameters }, string>();
