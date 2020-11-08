import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import H2Title from '../../layout/titles/h2-title';
import { useContainerStyles } from '../../../layouts/custom-styles';
import { WeatherForecastState } from '../../../features/weather-forecast/interfaces';
import { RenderCurrentWeatherInfographic } from './infographic';

import './weather-forecast-word.scss';

type Props = {

};

const WeatherForecastWord: FunctionComponent<Props> = () => {
    const containerClasses = useContainerStyles();
    const forecastText  = useSelector((state: RootState) => state.weatherForecast.forecastText);
    const isLoadingForecastText  = useSelector((state: RootState) => state.weatherForecast.isLoadingForecastText);
    
    console.log(forecastText);
    console.log(isLoadingForecastText);

    const forecastTextContent = createForecastTextContent(forecastText);

    return (
        <Box mt={2}>
            <Container fixed>
                <Grid container className={`${containerClasses.root} main-weather-forecast-wrapper`}>
                    <Grid item xs={12} md={4}>
                        <Box component="div" mr={2} ml={2}>
                            <H2Title title="Trenutno stanje" />
                            <Typography
                                color="textPrimary"
                                align="center"
                                variant="body2">
                                { forecastText.forecastDate }
                            </Typography>
                            <RenderCurrentWeatherInfographic />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Box component="div" mr={2} ml={2}>
                            { forecastTextContent }
                            <Typography
                                className="weather-forecast-source"
                                color="textPrimary"
                                align="center"
                                variant="body2">
                                    Vir: ARSO
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default WeatherForecastWord;


function createForecastTextContent(forecastText: WeatherForecastState) {
    const titles: string[] = ['Napoved za Slovenijo', 'Napoved za sosednje pokrajine', 'Vremenska slika', 'Obeti'];
    const sections: (string[] | undefined)[] = [
        forecastText.forecastSlovenia,
        forecastText.forecastNeighborCountry,
        forecastText.weatherImage,
        forecastText.outlook
    ];

    return sections.map((texts, index) => {
        if (texts) {
            const text = texts.map((text, index) => (
                <Typography
                    key={index}
                    color="textPrimary"
                    align="justify"
                    variant="body2">
                    { text }
                </Typography>
            ));

            return <Box key={index}>
                < H2Title title={titles[index]} />
                { text }
            </Box>;
        }
    });
}
