import { createAsyncAction } from 'typesafe-actions';
import { WeatherForecastResponseData } from './interfaces';

export const getWeatherForecastDataAsyncAction = createAsyncAction(
    'weatherForecast/get/request',
    'weatherForecast/get/success',
    'weatherForecast/get/failure'
)<undefined,WeatherForecastResponseData, string>();
