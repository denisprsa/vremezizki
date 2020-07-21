import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useWarningStyles, useContainerStyles } from '../../../layouts/custom-styles';

type Props = {
    
}

const WeatherWarnings: FunctionComponent<Props> = () => {
    const warningClasses = useWarningStyles();
    const containerClasses = useContainerStyles();

    return (
        <Box mt={3} textAlign="center">
            <Container fixed>
                <Grid container className={`${containerClasses.root} ${warningClasses.root}`}>
                    <Grid item xs={12}>
                        <h1>
                            What is Lorem Ipsum?
                        </h1>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
                        </p>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default WeatherWarnings;
