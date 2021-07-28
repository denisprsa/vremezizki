import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';

import './footer.scss';
import { Container, Grid } from '@material-ui/core';
import { ReactSVG } from 'react-svg';

type Props = {
}

const Footer: FunctionComponent<Props> = () => {

  return (
    <Box mt={3} className="footer-wrapper">
      <Container fixed>
        <Grid container>
          <Grid item xs={12}>
            <div className="footer-logo-wrapper">
              <div className="footer-logo-icon">
                <ReactSVG src="/assets/footer/weather-station-footer-logo.svg" />
              </div>
              <div className="footer-logo-name">
                                Vremenska Postaja Žižki
              </div>
            </div>
            <div className="footer-bottom-wrapper">
              <div>
                                © 2020 Denis Prša
              </div>
              <div>
                                Podatke meri vremenska postaja Davis Vantage Pro 2
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
