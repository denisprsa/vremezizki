import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import { ReactSVG } from 'react-svg';
import { RootState } from 'StoreTypes';
import { useSelector } from 'react-redux';
import moment from 'moment';

import './weather-forecast-hourly.scss';

import Carousel from '../../carousel/carousel';
import { useProperBackground } from '../../../layouts/custom-styles';
import GetForecastIcon from './forecast-icon';
import { HourlyWeatherForecastState } from '../../../features/weather-forecast/interfaces';

type Percentages = {
    prev: number | undefined;
    current: number;
    next: number | undefined;
};

type Props = {

};

const WeatherForecastHourly: FunctionComponent<Props> = () => {
    const styles = useProperBackground();

    const hourlyForecast = useSelector((state: RootState) => state.weatherForecast.hourlyForecast);
    const isLoadingHourlyForecast = useSelector((state: RootState) => state.weatherForecast.isLoadingHourlyForecast);

    const items = new Array(24).fill(1);
    let carouselItems = items.map((_, index) => {
        const separator = (index < items.length - 1) ? styles.separatorBorderRight : '';
        return renderForecastLoadingItem(index, styles.root, separator);
    });

    if (!isLoadingHourlyForecast) {
        let minTemp = 100;
        let maxTemp = -100;

        hourlyForecast.forEach((value) => {
            if (minTemp > value.temperature) minTemp = value.temperature;
            if (maxTemp < value.temperature) maxTemp = value.temperature;
        });

        const differenceMinMax = maxTemp - minTemp;
        const addNegative = minTemp < 0 ? Math.abs(minTemp) : 0;

        const percentageItems = hourlyForecast.map((item) => ((item.temperature + addNegative) / differenceMinMax));

        carouselItems = hourlyForecast.map((item, index) => {
            const percentages = {
                prev: percentageItems[index - 1],
                current: percentageItems[index],
                next: percentageItems[index + 1]
            };
            const separator = (index < hourlyForecast.length - 1) ? styles.separatorBorderRight : '';

            return renderForecastItem(index, item, styles.root, separator, item, percentages);
        });
    }

    return (
        <Box mt={2} className="forecast-hourly-wrapper">
            <Carousel marginLeftMobile={15}>
                { carouselItems }
            </Carousel>
        </Box>
    );
};

export default WeatherForecastHourly;

function renderForecastItem(index: number, item: HourlyWeatherForecastState,
    rootStyles: string, separator: string, data: HourlyWeatherForecastState,
    percentages: Percentages) {
    
    const icon = GetForecastIcon(item.icon);

    return (
        <div key={index}
            className={`weather-forecast-hourly-item ${rootStyles} ${separator}`}>
            <div className="weather-forecast-day">
                { getDayNameSI(moment.utc(item.date).format('dddd')) }
            </div>
            <div className="weather-forecast-date">
                { moment.utc(item.date).format('DD.MM, HH:mm') }
            </div>
            <div className="weather-forecast-icon">
                <ReactSVG src={icon ? icon : ''} />
            </div>
            <div className="weather-forecast-graph">
                { renderHourGraph(99, 150, percentages) }
            </div>
            <div className="weather-forecast-text">
                { data.temperature }
            </div>
        </div>
    );
}

function getDayNameSI(dayName: string): string {
    switch (dayName.toLowerCase()) {
    case 'monday': {
        return 'Ponedeljek';
    } case 'tuesday': {
        return 'Torek';
    } case 'wednesday': {
        return 'Sreda';
    } case 'thursday': {
        return 'Četrtek';
    } case 'friday': {
        return 'Petek';
    } case 'saturday': {
        return 'Sobota';
    } case 'sunday': {
        return 'Nedelja';
    } default: {
        return '---';
    }
    }
}

function renderHourGraph(width: number, height: number, percentages: Percentages) {
    const heightChart = height - 10;

    const calculateYPosition = (current: number, neighbor: number) => {
        return Math.floor(heightChart - (heightChart * ((current + neighbor) / 2)) + 5);
    };

    const prevPointY = percentages.prev !== undefined  ? calculateYPosition(percentages.current, percentages.prev) : 0;
    const prevPointX = 0;

    const pointY = calculateYPosition(percentages.current, percentages.current);
    const pointX = Math.floor(width / 2);

    const nextPointY = percentages.next !== undefined  ? calculateYPosition(percentages.current, percentages.next) : 0;
    const nextPointX = width;

    return (
        <svg width={width} height={height}>
            { percentages.prev !== undefined && <line x1={prevPointX} y1={prevPointY} x2={pointX} y2={pointY} stroke="rgb(23, 105, 170)" strokeWidth="3"/> }
            { percentages.next !== undefined && <line x1={pointX} y1={pointY} x2={nextPointX} y2={nextPointY} stroke="rgb(23, 105, 170)" strokeWidth="3"/>}
        </svg>
    );
}

function renderForecastLoadingItem(index: number, rootStyles: string, separator: string) {
    return (
        <div key={index}
            className={`weather-forecast-hourly-item ${rootStyles} ${separator}`}>
            <div className="weather-forecast-hour">
            </div>
            <div className="weather-forecast-icon">
            </div>
            <div className="weather-forecast-graph">
                
            </div>
            <div className="weather-forecast-text">

            </div>
        </div>
    );
}
