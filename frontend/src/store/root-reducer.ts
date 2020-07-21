import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { weatherStation } from '../features/weather-station/reducers';
import { theme } from '../features/theme/reducers'; 

export const rootReducer = (history: History<any>) => combineReducers({
    router: connectRouter(history),
    weatherStation,
    theme
});

export default rootReducer;
