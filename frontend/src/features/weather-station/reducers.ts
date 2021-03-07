import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';

import { getWeatherStationDataAsyncAction } from './actions';
import { WeatherStationData, WeatherStationDataStatistic } from './interfaces';

const MIN = 9999;
const MAX = -9999;
const initialStateWeatherData: WeatherStationData[] = [];
const initialStateWeatherDataStatistic: WeatherStationDataStatistic = {
    temperature: {
        min: MIN,
        max: MAX,
        current: 0
    },
    dewPoint: {
        min: MIN,
        max: MAX,
        current: 0
    },
    humidity: {
        min: MIN,
        max: MAX,
        current: 0
    },
    windDirection: {
        current: 0
    },
    windSpeed: {
        max: MAX,
        current: 0
    },
    windGust: {
        max: MAX,
        current: 0
    },
    rain: {
        current: 0
    },
    pressure: {
        min: MIN,
        max: MAX,
        current: 0
    }
};

export const weatherStation = combineReducers({
    isLoadingWeatherData: createReducer(true)
        .handleAction(getWeatherStationDataAsyncAction.request, () => true)
        .handleAction([
            getWeatherStationDataAsyncAction.success,
            getWeatherStationDataAsyncAction.failure
        ], () => false),
    weatherData: createReducer(initialStateWeatherData)
        .handleAction(getWeatherStationDataAsyncAction.success, (_, action) => action.payload),
    weatherDataStatistic: createReducer(initialStateWeatherDataStatistic)
        .handleAction(getWeatherStationDataAsyncAction.success, (_, action) => {
            const weatherStatistic: WeatherStationDataStatistic = Object.create(initialStateWeatherDataStatistic);
            action.payload.forEach(value => {
                if (value.temperature > weatherStatistic.temperature.max) {
                    weatherStatistic.temperature.max = value.temperature;
                }
                if (value.temperature < weatherStatistic.temperature.min) {
                    weatherStatistic.temperature.min = value.temperature;
                }
            });

            return weatherStatistic;
        })
});
