import { WeatherDataRequestParameters, WeatherStationData,
  WeatherStationDataStatistic,
  WeatherStationGraphData } from 'features/weather-station/interfaces';


export function getInitialWeatherStationData(): WeatherStationDataStatistic {
  const MIN = 9999;
  const MAX = -9999;

  return {
    temperature: {
      min: MIN,
      max: MAX,
      current: 0
    },
    dewPoint: {
      min: MIN,
      max: MAX,
      current: 0
    },
    humidity: {
      min: MIN,
      max: MAX,
      current: 0
    },
    windDirection: {
      current: 0
    },
    windSpeed: {
      max: MAX,
      current: 0
    },
    windGust: {
      max: MAX,
      current: 0
    },
    rain: {
      current: 0
    },
    pressure: {
      min: MIN,
      max: MAX,
      current: 0
    }
  };
}

export function getInitialWeatherStationGraphData(): WeatherStationGraphData {
  return {
    temperature: [],
    dewPoint: [],
    humidity: [],
    rain: [],
    windDirection: [],
    windGust: [],
    windSpeed: [],
    pressure: [],
    date: [],
    datetime: []
  };
}

export function mapWeatherStationData(payload: WeatherStationData[]): WeatherStationDataStatistic {
  const weatherStatistic = getInitialWeatherStationData();

  payload.forEach(value => {
    if (value.temperature > weatherStatistic.temperature.max) {
      weatherStatistic.temperature.max = value.temperature;
    }
    if (value.temperature < weatherStatistic.temperature.min) {
      weatherStatistic.temperature.min = value.temperature;
    }

    if (value.dewpoint > weatherStatistic.dewPoint.max) {
      weatherStatistic.dewPoint.max = value.dewpoint;
    }
    if (value.dewpoint < weatherStatistic.dewPoint.min) {
      weatherStatistic.dewPoint.min = value.dewpoint;
    }

    if (value.humidity > weatherStatistic.humidity.max) {
      weatherStatistic.humidity.max = value.humidity;
    }
    if (value.humidity < weatherStatistic.humidity.min) {
      weatherStatistic.humidity.min = value.humidity;
    }

    if (value.pressure > weatherStatistic.pressure.max) {
      weatherStatistic.pressure.max = value.pressure;
    }
    if (value.pressure < weatherStatistic.pressure.min) {
      weatherStatistic.pressure.min = value.pressure;
    }

    if (value.windNormal > weatherStatistic.windSpeed.max) {
      weatherStatistic.windSpeed.max = value.windNormal;
    }

    if (value.windGusts > weatherStatistic.windGust.max) {
      weatherStatistic.windGust.max = value.windGusts;
    }

    weatherStatistic.rain.current += value.rain;
  });

  if (payload.length > 0) {
    const lastRecord = payload[payload.length - 1];

    weatherStatistic.temperature.current = lastRecord.temperature;
    weatherStatistic.dewPoint.current = lastRecord.dewpoint;
    weatherStatistic.humidity.current = lastRecord.humidity;
    weatherStatistic.pressure.current = lastRecord.pressure;
    weatherStatistic.windDirection.current = lastRecord.windDirection;
    weatherStatistic.windGust.current = lastRecord.windGusts;
    weatherStatistic.windSpeed.current = lastRecord.windNormal;
    weatherStatistic.rain.current = Number(weatherStatistic.rain.current.toFixed(1));
  }

  return weatherStatistic;
}

export function mapWeatherStationGraphData(payload: WeatherStationData[], parameters: WeatherDataRequestParameters): WeatherStationGraphData {
  let rainSum = 0;

  const lastDate = new Date();
  lastDate.setMinutes(lastDate.getMinutes() + 1);

  const endDayDate = new Date();
  endDayDate.setHours(23);
  endDayDate.setMinutes(59);
  endDayDate.setSeconds(59);

  const datesToAdd: Date[] = [];

  if (!parameters.fromDate && !parameters.toDate) {
    datesToAdd.push(lastDate);
    datesToAdd.push(endDayDate);
  }

  return {
    date: payload.map(value => value.date).concat(datesToAdd),
    datetime: payload.map(value => value.datetime),
    temperature: payload.map(value => value.temperature),
    dewPoint: payload.map(value => value.dewpoint),
    humidity: payload.map(value => value.humidity),
    windDirection: payload.map(value => value.windDirection),
    windGust: payload.map(value => value.windGusts),
    windSpeed: payload.map(value => value.windNormal),
    rain: payload.map(value => { rainSum += value.rain; return rainSum; }),
    pressure: payload.map(value => value.pressure),
  };
}