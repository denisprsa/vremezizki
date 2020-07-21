import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getWeatherStationDataAsyncAction } from '../../features/weather-station/actions';
import WeatherStationHeader from './header/weather-station-header';
import WeatherWarnings from './weather-warnings/weather-warnings';
import WeatherForecastWord from './weather-forecast-word/weather-forecast-word';
import WeatherForecastHourly from './weather-forecast-hourly/weather-forecast-hourly';
import CurrentConditions from './current-conditions/current-conditions';
import Moon from './moon/moon';
import WeatherDataGraphs from './weather-data-graphs/weather-data-graphs';

type Props = {

}

const WeatherStationComponent: FunctionComponent<Props> = () => {
    /*
    const [ isLoadingWeatherData, weatherData ]  = useSelector((state: RootState) => [
        state.weatherStation.isLoadingWeatherData,
        state.weatherStation.weatherData
    ]);
    */
    useDispatchWeatherData();


    return (
        <>
            <WeatherStationHeader />
            <WeatherWarnings />
            <CurrentConditions />
            <WeatherForecastWord />
            <WeatherForecastHourly />
            <Moon />
            <WeatherDataGraphs />
        </>
    );
}

export default WeatherStationComponent;

function useDispatchWeatherData() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getWeatherStationDataAsyncAction.request({ id: 'id' }));
    }, [dispatch]);
}
