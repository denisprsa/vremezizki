import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';

import { getWeatherStationDataAsyncAction } from './actions';
import { WeatherStationData } from './interfaces';

const initialState: WeatherStationData[] = [];

export const weatherStation = combineReducers({
    isLoadingWeatherData: createReducer(true)
        .handleAction(getWeatherStationDataAsyncAction.request, () => true)
        .handleAction([
            getWeatherStationDataAsyncAction.success,
            getWeatherStationDataAsyncAction.failure
        ], () => false),
    weatherData: createReducer(initialState)
        .handleAction(getWeatherStationDataAsyncAction.success, (_, action) => {
            return action.payload;
        })
});
