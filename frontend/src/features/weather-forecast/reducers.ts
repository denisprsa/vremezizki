import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';

import {
    getWeatherForecastDataAsyncAction,
    getHourlyWeatherForecastDataAsyncAction } from './actions';
import { HourlyWeatherForecastState, WeatherForecastState } from './interfaces';
import {
    mapForecastResponseToState,
    mapHourlyForecastResponseToState } from './mappers';

const initialStateWeatherForecast: WeatherForecastState = {};
const initialStateHourlyForecast: HourlyWeatherForecastState[] = [];

export const weatherForecast = combineReducers({
    isLoadingForecastText: createReducer(true)
        .handleAction(getWeatherForecastDataAsyncAction.request, () => true)
        .handleAction([
            getWeatherForecastDataAsyncAction.success,
            getWeatherForecastDataAsyncAction.failure
        ], () => false),
    forecastText: createReducer(initialStateWeatherForecast)
        .handleAction(getWeatherForecastDataAsyncAction.success, (_, action) => 
            mapForecastResponseToState(action.payload)
        ),
    isLoadingHourlyForecast: createReducer(true)
        .handleAction(getHourlyWeatherForecastDataAsyncAction.request, () => true)
        .handleAction([
            getHourlyWeatherForecastDataAsyncAction.success,
            getHourlyWeatherForecastDataAsyncAction.failure
        ], () => false),
    hourlyForecast: createReducer(initialStateHourlyForecast)
        .handleAction(getHourlyWeatherForecastDataAsyncAction.success, (_, action) => 
            mapHourlyForecastResponseToState(action.payload)
        )
});
