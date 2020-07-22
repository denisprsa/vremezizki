import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { weatherStation } from '../features/weather-station/reducers';
import { theme } from '../features/theme/reducers'; 

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const rootReducer = (history: History<History.PoorMansUnknown>) => combineReducers({
    router: connectRouter(history),
    weatherStation,
    theme
});

export default rootReducer;
