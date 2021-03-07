import { WeatherStationData } from '../features/weather-station/interfaces';
import { fetchRequest } from './request-api';
import { WeatherDataRequestParameters } from './../features/weather-station/interfaces';

export const getWeatherData = async (parameters: WeatherDataRequestParameters): Promise<WeatherStationData[]> => {
    let dateFrom = new Date();
    dateFrom.setHours(0);

    let toDate = new Date();
    toDate.setHours(23);
    toDate.setMinutes(59);
    toDate.setSeconds(59);

    if (parameters.fromDate) {
        dateFrom = parameters.fromDate;
    }

    if (parameters.toDate) {
        toDate = parameters.toDate;
    }

    const url = `https://api.vremezizki.si/weather-station/measurements?from=${dateFrom.toISOString()}&to=${toDate.toISOString()}`;
    const data = await fetchRequest(url);

    const body = data.json();

    return body;
};