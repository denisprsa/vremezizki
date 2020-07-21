import { WeatherStationData } from '../features/weather-station/interfaces';
import { fetchRequest } from './request-api';

export const getWeatherData = async (weatherData: {id: string}): Promise<WeatherStationData[]> => {
    const dateFrom = new Date();
    const dateTo = new Date();
    dateFrom.setHours(0);

    const url = `https://api.vremezizki.si/weather-station/measurements?from=${dateFrom.toISOString()}&to=${dateTo.toISOString()}`
    const data = await fetchRequest(url);

    const body = data.json();

    return body;
}