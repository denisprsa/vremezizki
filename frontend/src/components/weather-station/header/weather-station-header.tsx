import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';

import './weather-station-header.scss';
import { Container, Box } from '@material-ui/core';

type Props = {

}

const WeatherStationHeader: FunctionComponent<Props> = () => {
    return (
        <Box>
            <Container fixed>
                <Grid container>
                    <Grid item xs={12}>
                        <div className="weather-station-header-title"> Vremenska postaja Žižki </div>
                        <div className="weather-station-header-image"
                            style={{ backgroundImage: 'url(/assets/header/header-supercell-2.png)' }}>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default WeatherStationHeader;
