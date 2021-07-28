import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';

import { getWeatherStationDataAsyncAction } from 'features/weather-station/actions';
import { WeatherStationData } from 'features/weather-station/interfaces';
import { getInitialWeatherStationData,
  getInitialWeatherStationGraphData,
  mapWeatherStationData, 
  mapWeatherStationGraphData} from 'features/weather-station/mappers';

const initialStateWeatherData: WeatherStationData[] = [];

const initialStateWeatherDataStatistic = getInitialWeatherStationData();
const initialStateWeatherDataGraph = getInitialWeatherStationGraphData();

export const weatherStation = combineReducers({
  isLoadingWeatherData: createReducer(true)
    .handleAction(getWeatherStationDataAsyncAction.request, () => true)
    .handleAction([
      getWeatherStationDataAsyncAction.success,
      getWeatherStationDataAsyncAction.failure
    ], () => false),
  weatherData: createReducer(initialStateWeatherData)
    .handleAction(getWeatherStationDataAsyncAction.success, (_, action) => action.payload.data),
  weatherDataStatistic: createReducer(initialStateWeatherDataStatistic)
    .handleAction(getWeatherStationDataAsyncAction.success, (_, action) =>
      mapWeatherStationData(action.payload.data)),
  weatherDataGraph: createReducer(initialStateWeatherDataGraph)
    .handleAction(getWeatherStationDataAsyncAction.success, (_, action) => 
      mapWeatherStationGraphData(action.payload.data, action.payload.parameters))
});
