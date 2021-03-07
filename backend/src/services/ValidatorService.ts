import { WeatherStationData } from 'src/interfaces/WeatherStationData';
import { DateTime,  } from 'luxon';
import { ServiceError } from '../helpers/ServiceError';

export default class ValidatorService {
    public validateWeatherStationData(data: WeatherStationData): void {
        const date = DateTime.fromFormat(data.datetime, 'yyyy-MM-dd HH:mm:ss');

        if (date.isValid === false) {
            throw new ServiceError('Invalid date time format. Should be "YYYY-MM-DD HH:mm:ss".', 400, 'invalidDateFormat');
        }
    }
}
