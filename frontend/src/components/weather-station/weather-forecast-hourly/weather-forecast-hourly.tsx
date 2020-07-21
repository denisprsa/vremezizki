import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';

import './weather-forecast-hourly.scss';

import Carousel from '../../carousel/carousel';
import { useProperBackground } from '../../../layouts/custom-styles';

type Props = {

}

const WeatherForecastHourly: FunctionComponent<Props> = () => {
    const styles = useProperBackground();
    const items = new Array(24).fill(1);
    const carouselItems = items.map((_, index) => {
        const separator = (index < items.length - 1) ? styles.separatorBorderRight : '';
        return (
            <div key={index}
                className={`weather-forecast-hourly-item ${styles.root} ${separator}`}>
                {index}
            </div>
        );
    });

    return (
        <Box mt={2} className="forecast-hourly-wrapper">
            <Carousel marginLeftMobile={15}>
                { carouselItems }
            </Carousel>
        </Box>
    );
};

export default WeatherForecastHourly;
