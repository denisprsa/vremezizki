import { RootEpic } from 'StoreTypes';
import { from, of } from 'rxjs';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { getWeatherStationDataAsyncAction } from './actions';

export const fetchWeatherStationData: RootEpic = (action$, _, { weatherData }) =>
    action$.pipe(
        filter(isActionOf(getWeatherStationDataAsyncAction.request)),
        switchMap(action => from(weatherData.getWeatherData(action.payload))
            .pipe(
                map(getWeatherStationDataAsyncAction.success),
                catchError((message: string) => of(getWeatherStationDataAsyncAction.failure(message)))
            )
        )
    );
  