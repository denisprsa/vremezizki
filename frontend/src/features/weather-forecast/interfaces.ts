
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

export interface HourlyWeatherForecastResponseData {
    forecast1h: Forecast;
    forecast3h: Forecast;
    forecast6h: Forecast;
    forecast24h: Forecast;
    observation: Forecast;
}

export interface Forecast {
    dataType: string;
    features: ForecastFeature[];
}

export interface ForecastFeature {
    geometry: any;
    properties: {
        country: string;
        days: FeatureDay[];
    }
}

export interface FeatureDay {
    UTCoffset: string;
    date: string;
    sunset: string;
    sunrise: string;
    timeline: DayTimeline[];
}

export interface DayTimeline {
    cloudBase_shortText: string;
    clouds_icon_wwsyn_icon: string;
    clouds_shortText: string;
    clouds_shortText_wwsyn_shortText: string;
    dd_shortText: string;
    ddff_icon: string;
    ff_shortText: string;
    ff_val: string;
    ffmax_val: string;
    interval: string;
    msl: string;
    pa_shortText: string;
    rh: string;
    rh_shortText: string;
    sn_acc: string;
    t: string;
    time: string;
    tp_acc: string;
    valid: string;
    wwsyn_decodeText: string;
    wwsyn_icon: string;
    wwsyn_shortText: string;
}

export interface HourlyWeatherForecastState {
    id: string;
    date: string;
    icon: string;
    cloudsShortText: string;
    windDirection: string;
    pressure: number;
    pressureText: string;
    humidity: number;
    humidityText: string;
    temperature: number;
}
