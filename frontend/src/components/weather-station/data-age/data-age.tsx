import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import './data-age.scss';

const DataAge: FunctionComponent = () => {
    const [dataAgeFormat, setDataAgeFormat] = useState('--');
    const [dataAgeInSec, setDataAgeInSec] = useState(120);
    const [dataAgeColor, setDataAgeColor] = useState('red');
    const isLoadingWeatherData  = useSelector((state: RootState) => state.weatherStation.isLoadingWeatherData);
    const weatherData  = useSelector((state: RootState) => state.weatherStation.weatherData);

    useEffect(() => {
        if (!isLoadingWeatherData && weatherData.length) {
            const lastRecord = weatherData[weatherData.length - 1];
            const ageInSeconds = calculateDataAgeInSeconds(lastRecord.date);
            setDataAgeInSec(ageInSeconds);
            setDataAgeFormat(getDataAgeFormatFromSeconds(ageInSeconds));
        } else {
            setDataAgeFormat('--');
        }
    }, [isLoadingWeatherData, weatherData]);

    if (dataAgeInSec < 240 && dataAgeColor !== 'green') {
        setDataAgeColor('green');
    } else if (dataAgeInSec >= 240 && dataAgeColor !== 'red') {
        setDataAgeColor('red');
    }

    return (
        <Box mt={3} className="data-age">
            <Container fixed>
                <Grid container>
                    <Grid item xs={12}>
                        <div className="data-age-text" style={{fontSize: '15px', fontWeight: 'bold', display: 'flex'}}>
                            <div>Starost podatkov: <span className="">{dataAgeFormat}</span></div>
                            <div className="data-age-icon">
                                <FiberManualRecordIcon style={{ display: 'block', color: `${dataAgeColor}` }} fontSize={'small'}/>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default DataAge;

function calculateDataAgeInSeconds(date: Date): number {
    return Math.floor((new Date().getTime() - date.getTime()) / 1000);
}

function getDataAgeFormatFromSeconds(ageInSeconds: number): string {
    if (ageInSeconds < 60) {
        return `${ageInSeconds} s`;
    } else if (ageInSeconds < 60 * 60) {
        return `${Math.floor(ageInSeconds / 60)} min`;
    } else {
        return `${Math.floor(ageInSeconds / 60 / 60)} h`;
    }
}
