import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useContainerStyles } from '../../../layouts/custom-styles';

type Props = {

};

const WeatherForecastWord: FunctionComponent<Props> = () => {
    const containerClasses = useContainerStyles();

    return (
        <Box mt={2}>
            <Container fixed>
                <Grid container className={`${containerClasses.root}`}>
                    <Grid item xs={6} >
                        <p>
                            ads fad fs
                        </p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                            <br/>
                            666666
                        </p>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default WeatherForecastWord;
