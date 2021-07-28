import { WeatherForecastResponseData } from '../features/weather-forecast/interfaces';
import { fetchRequest } from './request-api';

export const getWeatherForecast = async (): Promise<WeatherForecastResponseData> => {
  const url = 'https://vreme.arso.gov.si/api/1.0/nonlocation/?lang=sl';

  const data = await fetchRequest(url);
  const body = await data.json();

  return body;
};

export const getHourlyWeatherForecast = async (): Promise<any> => {
  const url = 'https://vreme.arso.gov.si/api/1.0/location/?lang=sl&location=Lendava';
    
  const data = await fetchRequest(url);
  const body = await data.json();

  return body;
};