import { createAsyncAction, createAction } from 'typesafe-actions';
import { WeatherStationData } from './interfaces';

export const addWeatherStationData = createAction('weatherStation/data/add');

export const getWeatherStationDataAsyncAction = createAsyncAction(
    'weatherStation/data/get/request',
    'weatherStation/data/get/success',
    'weatherStation/data/get/failure'
)<{id: string}, WeatherStationData[], string>();
