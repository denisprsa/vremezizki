import { WeatherForecastResponseData, WeatherForecastState } from './interfaces';


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