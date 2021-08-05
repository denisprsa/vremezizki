import React, { FunctionComponent, useCallback } from 'react';
import { RootState } from 'StoreTypes';
import { useSelector, useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';

import IconButton from '@material-ui/core/IconButton';
import DarkThemeIcon from '@material-ui/icons/Brightness4';
import LightThemeIcon from '@material-ui/icons/BrightnessHigh';
import Settings from '@material-ui/icons/Settings';
import Map from '@material-ui/icons/Map';
import Forum from '@material-ui/icons/Forum';
import BarChart from '@material-ui/icons/BarChart';

import './navigation.scss';
import { NavigationItemLink, NavigationItemButton } from './navigation-item';
import { changeThemeAction } from '../../features/theme/actions';

type Props = {

}

const Navigation: FunctionComponent<Props> = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const navigationStyle = { color: theme.palette.primary.dark };
  const navigationItemStyle = { fill: '#fff' };
  const changeTheme = useChangeTheme();

  return (
    <div className="navigation-wrapper" style={{ ...navigationStyle }}>
      <div>
        <div className="header-status-wrapper">
          <ReactSVG src="/assets/navigation/weather.svg" />
        </div>
      </div>
      <div>
        <NavigationItemLink navigationItemStyle={navigationItemStyle} location="/">
          <IconButton aria-label="current conditions" component="span">
            <BarChart />
          </IconButton>
        </NavigationItemLink>
      </div>
      <div>
        <NavigationItemButton>
          <IconButton aria-label="change theme" component="span" onClick={changeTheme}>
            { isDark ? <LightThemeIcon /> : <DarkThemeIcon /> }
          </IconButton>
        </NavigationItemButton>
      </div>
    </div>
  );
};

export default Navigation;

function useChangeTheme() {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(changeThemeAction());
  }, [dispatch]);
}
