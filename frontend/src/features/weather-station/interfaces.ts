
export interface WeatherStationData {
    datetime: string;
    date: Date;
    temperature: number;
    dewPoint: number;
    humidity: number;
    windDirection: number;
    windSpeed: number;
    windGust: number;
    rain: number;
    pressure: number;
}

export interface WeatherStationDataStatistic {
    temperature: {
        min: number;
        max: number;
        current: number;
    };
    dewPoint: {
        min: number;
        max: number;
        current: number;
    };
    humidity: {
        min: number;
        max: number;
        current: number;
    };
    windDirection: {
        current: number;
    };
    windSpeed: {
        max: number;
        current: number;
    };
    windGust: {
        max: number;
        current: number;
    };
    rain: {
        current: number;
    };
    pressure: {
        min: number;
        max: number;
        current: number;
    };
}

export interface WeatherDataRequestParameters {
    fromDate?: Date;
    toDate?: Date;
}
