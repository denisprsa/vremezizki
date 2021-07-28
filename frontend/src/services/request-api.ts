import WeatherError from '../models/weather-error';

export async function fetchRequest(url: string, options: RequestInit = {}): Promise<Response> {
  let response: Response;

  try {
    response = await fetch(url, options);
  } catch(error) {
    throw new WeatherError('Something went wrong while downloading a weather data, please try again.', error, error.status);
  }

  if (response.ok) {
    return response;
  }
  
  const json = await response.json();
  const { message } = json;

  throw new WeatherError(message, json, response.status);
}
