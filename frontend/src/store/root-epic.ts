import { combineEpics } from 'redux-observable';

import * as weatherStationData from '../features/weather-station/epics';

export default combineEpics(
    ...Object.values(weatherStationData)
);
