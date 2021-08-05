import { Box, Container, Grid, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';

import './not-found.scss';

type Props = {

};

const NotFound: FunctionComponent<Props> = () => {
  return (
    <Box mt={3}>
      <Container fixed>
        <Grid container>
          <Grid item xs={12} className="full-height">
            <Typography align="center" variant="h3">
              Stran ne obstaja!
            </Typography>
          </Grid>
        </Grid>
      </Container>    
    </Box>
  );
};

export default NotFound;
