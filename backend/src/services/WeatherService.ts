import DependencyService from './DependencyService';
import { WeatherStationData } from '../interfaces/WeatherStationData';
import { ServiceError } from '../helpers/ServiceError';
import { DateTime, Interval } from 'luxon';
export default class WeatherService {
    constructor(private dependencies: DependencyService) {

    }

    public async createWeatherStationRecord(data: WeatherStationData): Promise<void> {
        this.dependencies.validatorService.validateWeatherStationData(data);
        await this.dependencies.mySqlDatabase.createWeatherStationRecord(data);
        this.dependencies.webSocketService.sendDataToAllClients(data);
    }

    public async getWeatherStationRecords(from: string | undefined, to: string | undefined): Promise<any> {
        let dateFrom = DateTime.local().startOf('day');
        let dateTo = DateTime.local().endOf('day');

        if (from) {
            dateFrom = DateTime.fromISO(from);
        }

        if (to) {
            dateTo = DateTime.fromISO(to);
        }

        if (dateFrom.isValid === false) {
            throw new ServiceError('Parameter "from" is invalid date time format. Should be ISO 8601.', 400, 'invalidDateFormat');
        }

        if (dateTo.isValid === false) {
            throw new ServiceError('Parameter "to" is invalid date time format. Should be ISO 8601.', 400, 'invalidDateFormat');
        }

        if (from && to && dateFrom.toSeconds() >= dateTo.toSeconds()) {
            throw new ServiceError('Parameter "to" should be larger than "from".', 400, 'startDateLargerThanEndDate')
        }

        const oneWeekInSeconds = 604800;
        if (dateTo.toSeconds() - dateFrom.toSeconds() > oneWeekInSeconds) {
            throw new ServiceError('Time difference cannot be larger than one week.', 400, 'differenceBetweenTimeTooLarge');
        }

        const formattedFrom = dateFrom.toFormat('yyyy-MM-dd HH:mm:ss');
        const formattedTo = dateTo.toFormat('yyyy-MM-dd HH:mm:ss');
        const measurements = await this.dependencies.mySqlDatabase.getWeatherStationRecords(formattedFrom, formattedTo);

        return measurements.map((value: WeatherStationData) => {
            return {
                ...value,
                datetime: new Date(value.datetime).toISOString()
            };
        })
    }
}