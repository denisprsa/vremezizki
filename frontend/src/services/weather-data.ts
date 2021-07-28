import { WeatherStationData } from '../features/weather-station/interfaces';
import { fetchRequest } from './request-api';
import { WeatherDataRequestParameters } from './../features/weather-station/interfaces';

export const getWeatherData = async (parameters: WeatherDataRequestParameters): Promise<WeatherStationData[]> => {
  const url = new URL('/weather-station/measurements', 'https://api.vremezizki.si');
  const urlSearchParams = new URLSearchParams();

  if (parameters.fromDate) {
    urlSearchParams.append('from', parameters.fromDate.toISOString());
  }

  if (parameters.toDate) {
    urlSearchParams.append('to', parameters.toDate.toISOString());
  }

  url.search = urlSearchParams.toString();

  const data = await fetchRequest(url.toString());
  const body = await data.json();

  return body;
};