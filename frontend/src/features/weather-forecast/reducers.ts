import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';

import { getWeatherForecastDataAsyncAction } from './actions';
import { WeatherForecastState } from './interfaces';
import { mapForecastResponseToState } from './mappers';

const initialStateWeatherForecast: WeatherForecastState = {};


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
        )
});
