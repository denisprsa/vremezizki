import { combineEpics } from 'redux-observable';

import * as weatherStationData from '../features/weather-station/epics';
import * as weatherForecastData from '../features/weather-forecast/epics';

export default combineEpics(
  ...Object.values(weatherStationData),
  ...Object.values(weatherForecastData)
);
