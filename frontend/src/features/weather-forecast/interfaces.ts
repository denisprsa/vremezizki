
export interface WeatherForecastResponseData {
    fcast_si_text: {
        articleinfo: {
            pubdate: string;
            title: string;
            tsValid_issued: string;
        };
        dataType: string;
        features: string;
        params: string;
        section: WeatherForecastResponseSectionData[];
    }
}

export interface WeatherForecastResponseSectionData {
    para: string;
    title: string;
}

export interface WeatherForecastState {
    forecastSlovenia?: string[];
    forecastNeighborCountry?: string[];
    weatherImage?: string[];
    outlook?: string[];
    warning?: string[];
    forecastDate? : string;
}