import React, { FunctionComponent } from 'react';
import { RootState } from 'StoreTypes';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useWarningStyles, useContainerStyles } from '../../../layouts/custom-styles';
// import H2Title from '../../layout/titles/h2-title';
import { useSelector } from 'react-redux';

type Props = {
    
}

const WeatherWarnings: FunctionComponent<Props> = () => {
  const warningClasses = useWarningStyles();
  const containerClasses = useContainerStyles();
  const forecastText = useSelector((state: RootState) => state.weatherForecast.forecastText);

  const warningText = forecastText.warning?.map((text, index) => 
    <Typography
      key={index}
      align="center"
      variant="body1"
      style={{ fontWeight: 'bold', padding: '10px 0' }}>
      {text}
    </Typography>
    );

  return (
    <Box mt={3} textAlign="center">
      <Container fixed>
        <Grid container className={`${containerClasses.root} ${warningClasses.root}`}>
          <Grid item xs={12}>
            <Box m={1}>
              <Typography
                align="center"
                variant="h5"
                style={{ fontWeight: 'bold', padding: '15px 0' }}>Opozorila</Typography>
              {warningText}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WeatherWarnings;
