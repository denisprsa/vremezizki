import {
    WeatherForecastResponseData,
    WeatherForecastState,
    HourlyWeatherForecastResponseData,
    HourlyWeatherForecastState, 
    FeatureDay} from './interfaces';


export function mapForecastResponseToState(data: WeatherForecastResponseData): WeatherForecastState {
    const forecastSlovenia: string[] = [];
    const forecastNeighborCountry = [];
    const weatherImage = [];
    const outlook = [];
    const warning = [];
    const forecastDate = data.fcast_si_text.articleinfo.pubdate;

    for (const item of data.fcast_si_text.section) {    
        if (item.title === 'NAPOVED ZA SLOVENIJO' && item.para) {
            forecastSlovenia.push(item.para);
        }
        
        if (item.title === 'NAPOVED ZA SOSEDNJE POKRAJINE' && item.para) {
            forecastNeighborCountry.push(item.para);
        }
        
        if (item.title === 'VREMENSKA SLIKA' && item.para) {
            weatherImage.push(item.para);
        }
        
        if (item.title === 'OBETI' && item.para) {
            outlook.push(item.para);
        }

        if (item.title === 'OPOZORILO' && item.para !== 'Dodatnega opozorila ni.') {
            warning.push(item.para);
        }
    }

    return {
        forecastSlovenia,
        forecastNeighborCountry,
        weatherImage,
        outlook,
        warning,
        forecastDate
    }; 
}

export function mapHourlyForecastResponseToState(data: HourlyWeatherForecastResponseData): HourlyWeatherForecastState[]  {
    let hourlyForecastData: HourlyWeatherForecastState[] = [];

    const mapDay = (day: FeatureDay, dayIndex: number) => 
        day.timeline.map((hour, hourIndex) => ({
            id: `${dayIndex}-${hourIndex}`,
            date: hour.valid,
            icon: hour.clouds_icon_wwsyn_icon,
            cloudsShortText: hour.clouds_shortText,
            windDirection: hour.ff_shortText,
            pressure: Number(hour.msl),
            pressureText: hour.pa_shortText,
            humidity: Number(hour.rh),
            humidityText: hour.rh_shortText,
            temperature: Number(hour.t)
        }));

    const forecast1h = data.forecast1h.features[0].properties.days.map(mapDay);
    const forecast3h = data.forecast3h.features[0].properties.days.map(mapDay);
    const forecast6h = data.forecast6h.features[0].properties.days.map(mapDay);
    // const forecast24h = data.forecast24h.features[0].properties.days.map(mapDay);

    hourlyForecastData = hourlyForecastData.concat(...forecast1h);
    hourlyForecastData = hourlyForecastData.concat(...forecast3h);
    hourlyForecastData = hourlyForecastData.concat(...forecast6h);

    console.log(hourlyForecastData);

    return hourlyForecastData;
}
