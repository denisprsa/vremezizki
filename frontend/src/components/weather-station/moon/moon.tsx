import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import { ReactSVG } from 'react-svg';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import './moon.scss';

import H2Title from 'components/layout/titles/h2-title';
import Carousel from '../../carousel/carousel';
import { useContainerStyles, useProperBackground } from '../../../layouts/custom-styles';
import { MoonIllumination, PhaseHunt, PhaseHuntObj } from './moon-phases';
import GetMonthName from '../../../helpers/month-names';

type Props = {

}

const Moon: FunctionComponent<Props> = () => {
  const containerClasses = useContainerStyles();
  const classes = useProperBackground();

  return (
    <Box mt={2} className="moon-wrapper">
      <Container fixed>
        <Grid container className={`${containerClasses.root} main-weather-forecast-wrapper`}>
          <Grid item xs={12}>
            <H2Title title="Luna" />
            <Carousel marginLeftMobile={0} positionCenter={true}>
              { getMoonItems(`${classes.root}`) }
            </Carousel>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Moon;


function getMoonItems(classes: string) {
  const dates: Date[] = [];

  for (let i = -15; i <= 15; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    date.setHours(22);
    date.setMinutes(0);
    dates.push(date);
  }

  return dates.map((val, index) => {
    const moonIllumination = MoonIllumination(val);
    let dateName = val.getDate() + ' ' + GetMonthName(val.getMonth());
    const phases = PhaseHunt(val);
    const moonIcon = getMoonIcon(moonIllumination.fraction, moonIllumination.phase, GetPhase(val, phases));

    if (val.getDate() === new Date().getDate() && val.getMonth() === new Date().getMonth()) {
      dateName = 'danes';
    }


    return (
      <div key={index} className={`moon-item ${classes}`}>
        <div className="astronomy-moon-slider-item-icon-wrapper">
          <div className="astronomy-moon-slider-item-icon">
            <ReactSVG src={moonIcon.icon} />
          </div>
        </div>
        <div className="astronomy-moon-day-name">
          { dateName }
        </div>
        <div className="astronomy-moon-illumination">
                    Svetlost { Math.round(moonIllumination.fraction * 100) } %
        </div>
        <div className="astronomy-moon-illumination">
          { moonIcon.name }
        </div>
        <div className="astronomy-moon-spacing"></div>
      </div>
    );
  });
}

function GetPhase(date: Date, phases: PhaseHuntObj[]): string | undefined {
  for (const phase of phases) {
    if (phase.date.getDate() === date.getDate() && phase.date.getMonth() === date.getMonth()) {
      return phase.type;
    }
  }
}

interface MoonObject {
  icon: string;
  name: string;
}

function setMoonObject(icon: string, name: string): MoonObject {
  return {
    icon: icon,
    name: name
  };
}

function getMoonIcon(fraction: number, phase: number, typePhase: string | undefined): MoonObject {
  // New Moon
  if (typePhase === 'newMoon') {
    return setMoonObject('/assets/moon/moon-new-moon.svg', 'mlaj');
  }

  // First Quarter
  if (typePhase === 'firstQuarter') {
    return setMoonObject('/assets/moon/moon-first-quarter.svg', 'prvi krajec');
  }

  // Full Moon
  if (typePhase === 'fullMoon') {
    return setMoonObject('/assets/moon/moon-full-moon.svg', 'ščip');
  }

  // Last Quarter
  if (typePhase === 'lastQuarter') {
    return setMoonObject('/assets/moon/moon-last-quarter.svg', 'zadnji krajec');
  }

  // Waxing Crescent
  if (phase > 0 && phase <= 0.25) {
    const luna = 'rastoči srp';
    if (fraction <= 0.075) {
      return setMoonObject('/assets/moon/moon-waning-crescent-5-p.svg', luna);
    }
    if (fraction > 0.075 && fraction <= 0.125) {
      return setMoonObject('/assets/moon/moon-waning-crescent-10-p.svg', luna);
    }
    if (fraction > 0.125 && fraction <= 0.175) {
      return setMoonObject('/assets/moon/moon-waning-crescent-15-p.svg', luna);
    }
    if (fraction > 0.175 && fraction <= 0.225) {
      return setMoonObject('/assets/moon/moon-waning-crescent-20-p.svg', luna);
    }
    if (fraction > 0.225 && fraction <= 0.275) {
      return setMoonObject('/assets/moon/moon-waning-crescent-25-p.svg', luna);
    }
    if (fraction > 0.275 && fraction <= 0.325) {
      return setMoonObject('/assets/moon/moon-waning-crescent-30-p.svg', luna);
    }
    if (fraction > 0.325 && fraction <= 0.375) {
      return setMoonObject('/assets/moon/moon-waning-crescent-35-p.svg', luna);
    }
    if (fraction > 0.375 && fraction <= 0.425) {
      return setMoonObject('/assets/moon/moon-waning-crescent-40-p.svg', luna);
    }
    return setMoonObject('/assets/moon/moon-waning-crescent-45-p.svg', luna);
  }

  // Waxing Gibbous
  if ((phase > 0.25 && phase <=0.50)) {
    const luna = 'naraščajoča luna';

    if (fraction <= 0.575) {
      return setMoonObject('/assets/moon/moon-waxing-gibbous-55-p.svg', luna);
    }
    if (fraction > 0.575 && fraction <= 0.625) {
      return setMoonObject('/assets/moon/moon-waxing-gibbous-60-p.svg', luna);
    }
    if (fraction > 0.625 && fraction <= 0.675) {
      return setMoonObject('/assets/moon/moon-waxing-gibbous-65-p.svg', luna);
    }
    if (fraction > 0.675 && fraction <= 0.725) {
      return setMoonObject('/assets/moon/moon-waxing-gibbous-70-p.svg', luna);
    }
    if (fraction > 0.725 && fraction <= 0.775) {
      return setMoonObject('/assets/moon/moon-waxing-gibbous-75-p.svg', luna);
    }
    if (fraction > 0.775 && fraction <= 0.825) {
      return setMoonObject('/assets/moon/moon-waxing-gibbous-80-p.svg', luna);
    }
    if (fraction > 0.825 && fraction <= 0.875) {
      return setMoonObject('/assets/moon/moon-waxing-gibbous-85-p.svg', luna);
    }
    if (fraction > 0.875 && fraction <= 0.925) {
      return setMoonObject('/assets/moon/moon-waxing-gibbous-90-p.svg', luna);
    }
    return setMoonObject('/assets/moon/moon-waxing-gibbous-55-p.svg', luna);
  }

  // Waning Gibbous
  if ((phase > 0.50 && phase <=0.75)) {
    const luna = 'upadajoča luna';

    if (fraction > 0.925) {
      return setMoonObject('/assets/moon/moon-waning-gibbous-95-p.svg', luna);
    }
    if (fraction <= 0.925 && fraction > 0.875) {
      return setMoonObject('/assets/moon/moon-waning-gibbous-90-p.svg', luna);
    }
    if (fraction <= 0.875 && fraction > 0.825) {
      return setMoonObject('/assets/moon/moon-waning-gibbous-85-p.svg', luna);
    }
    if (fraction <= 0.825 && fraction > 0.775) {
      return setMoonObject('/assets/moon/moon-waning-gibbous-80-p.svg', luna);
    }
    if (fraction <= 0.775 && fraction > 0.725) {
      return setMoonObject('/assets/moon/moon-waning-gibbous-75-p.svg', luna);
    }
    if (fraction <= 0.725 && fraction > 0.675) {
      return setMoonObject('/assets/moon/moon-waning-gibbous-70-p.svg', luna);
    }
    if (fraction <= 0.675 && fraction > 0.625) {
      return setMoonObject('/assets/moon/moon-waning-gibbous-65-p.svg', luna);
    }
    if (fraction <= 0.625 && fraction > 0.575) {
      return setMoonObject('/assets/moon/moon-waning-gibbous-60-p.svg', luna);
    }
    return setMoonObject('/assets/moon/moon-waning-gibbous-55-p.svg', luna);
  }

  const luna = 'upadajoči srp';
  // Waning Crescent
  if (fraction > 0.425) {
    return setMoonObject('/assets/moon/moon-waxing-crescent-45-p.svg', luna);
  }
  if (fraction <= 0.425 && fraction > 0.375) {
    return setMoonObject('/assets/moon/moon-waxing-crescent-40-p.svg', luna);
  }
  if (fraction <= 0.375 && fraction > 0.325) {
    return setMoonObject('/assets/moon/moon-waxing-crescent-35-p.svg', luna);
  }
  if (fraction <= 0.325 && fraction > 0.275) {
    return setMoonObject('/assets/moon/moon-waxing-crescent-30-p.svg', luna);
  }
  if (fraction <= 0.275 && fraction > 0.225) {
    return setMoonObject('/assets/moon/moon-waxing-crescent-25-p.svg', luna);
  }
  if (fraction <= 0.225 && fraction > 0.175) {
    return setMoonObject('/assets/moon/moon-waxing-crescent-20-p.svg', luna);
  }
  if (fraction <= 0.175 && fraction > 0.125) {
    return setMoonObject('/assets/moon/moon-waxing-crescent-15-p.svg', luna);
  }
  if (fraction <= 0.125 && fraction > 0.075) {
    return setMoonObject('/assets/moon/moon-waxing-crescent-10-p.svg', luna);
  }
  return setMoonObject('/assets/moon/moon-waxing-crescent-5-p.svg', luna);
}
