
import { routerActions } from 'connected-react-router';

import * as weatherStation from '../features/weather-station/actions';
import * as theme from '../features/theme/actions';

export default {
    router: routerActions,
    weatherStation,
    theme
};