import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import './weather-data-graphs.scss';

type Props = {

}

const WeatherDataGraphs: FunctionComponent<Props> = () => {
    return (
        <Box mt={2}>
            <Container fixed>
                <Grid container>
                    <Grid item xs={12}>
                        <div style={{height: 500, backgroundColor: 'blue'}}></div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default WeatherDataGraphs;
