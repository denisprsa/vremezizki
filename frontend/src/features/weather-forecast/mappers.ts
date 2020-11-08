import { WeatherForecastResponseData, WeatherForecastState } from './interfaces';

export function mapForecastResponseToState(data: WeatherForecastResponseData): WeatherForecastState {
    return {
        forecastSlovenia: data.sloForecast
    };
}