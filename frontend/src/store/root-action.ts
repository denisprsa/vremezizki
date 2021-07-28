
import { routerActions } from 'connected-react-router';

import * as weatherStation from '../features/weather-station/actions';
import * as weatherForecast from '../features/weather-forecast/actions';
import * as theme from '../features/theme/actions';

export default {
  router: routerActions,
  weatherStation,
  weatherForecast,
  theme
};