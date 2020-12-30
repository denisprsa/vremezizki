import { RootEpic } from 'StoreTypes';
import { from, of } from 'rxjs';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import {
    getWeatherForecastDataAsyncAction,
    getHourlyWeatherForecastDataAsyncAction } from './actions';

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

export const fetchHourlyWeatherForecastData: RootEpic = (action$, _, { weatherForecast }) =>
    action$.pipe(
        filter(isActionOf(getHourlyWeatherForecastDataAsyncAction.request)),
        switchMap(() => from(weatherForecast.getHourlyWeatherForecast())
            .pipe(
                map(getHourlyWeatherForecastDataAsyncAction.success),
                catchError((message: string) => of(getHourlyWeatherForecastDataAsyncAction.failure(message)))
            )
        )
    );
  