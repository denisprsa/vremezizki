import {Controller, Res, Next, Post, BodyParams, Get, QueryParams, Required} from '@tsed/common';
import * as Express from 'express';
import { Description, Summary, Returns, Name, ReturnsArray } from '@tsed/swagger';
import DependencyService from './../services/DependencyService';
import { WeatherStationDataModel } from '../swagger-models/WeatherStationDataModel';
import { WeatherStationData } from '../interfaces/WeatherStationData';

@Name('Weather station')
@Controller('/')
export class WeatherController {

    constructor(private dependencies: DependencyService) {}
    
    @Post('/weather-station/measurements')
    @Description('Add weather station measurement data.')
    @Summary('Add weather station measurement data.')
    @Returns(200, { description: 'Success' })
    async addWeatherStationData(
        @Res() response: Express.Response,
        @BodyParams({ useType: WeatherStationDataModel }) body: WeatherStationData
    ): Promise<void> {
        await this.dependencies.weatherService.createWeatherStationRecord(body);
        response.end();
    }

    @Get('/weather-station/measurements')
    @Description('Returns weather station measurements.')
    @Summary('Returns weather station measurements.')
    @ReturnsArray(200, { description: 'Success', type: WeatherStationDataModel })
    async getWeatherStationData(
        @Res() response: Express.Response,
        @QueryParams('from')
        @Description('Start ISO String date')
        from: string,
        @QueryParams('to')
        @Description('End ISO String date')
        to: string
    ): Promise<void> {
        let data = await this.dependencies.weatherService.getWeatherStationRecords(from, to);
        response.set('Access-Control-Allow-Origin', '*');
        response.json(data);
    }
}
