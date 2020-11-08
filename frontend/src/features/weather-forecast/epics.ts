import { RootEpic } from 'StoreTypes';
import { from, of } from 'rxjs';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { getWeatherForecastDataAsyncAction } from './actions';

export const fetchWeatherForecastData: RootEpic = (action$, _, { weatherForecast }) =>
    action$.pipe(
        filter(isActionOf(getWeatherForecastDataAsyncAction.request)),
        switchMap(() => from(weatherForecast.getWeatherForecast())
            .pipe(
                map(getWeatherForecastDataAsyncAction.success),
                catchError((message: string) => of(getWeatherForecastDataAsyncAction.failure(message)))
            )
        )
    );
  