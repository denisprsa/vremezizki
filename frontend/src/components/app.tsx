import React, { SFC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { RootState } from 'StoreTypes';
import { useSelector } from 'react-redux';

import { history } from '../store/store';
import WeatherStation from './weather-station/weather-station';
import Chat from './chat/chat';
import Navigation from './navigation/navigation';
import { HeaderStatus } from './header-status/header-status';

import './app.scss';
import Settings from './settings/settings';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { getTheme } from '../features/theme/get-theme';
import Footer from './footer/footer';


const App: SFC = () => {
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const theme = useSelector((state: RootState) => state.theme.theme);
    const headerStyles = { backgroundColor: theme.palette.primary.main };

    return (
        <ThemeProvider theme={getTheme(isDark)} >
            <CssBaseline/>
            <ConnectedRouter history={history}>
                <div className="main-app-wrapper">
                    <div className="main-app-header-place-wrapper">
                        <div className="main-app-header-wrapper" style={{...headerStyles}}>
                            <HeaderStatus />
                            <Navigation />
                        </div>
                    </div>
                    <main className="main-app-content-wrapper">
                        <Switch>
                            <Route exact path="/" component={WeatherStation}/>
                            <Route exact path="/chat" component={Chat}/>
                            <Route exact path="/settings" component={Settings}/>
                        </Switch>
                        <Footer />
                    </main>
                </div>
            </ConnectedRouter>
        </ThemeProvider>
    );
};

export default App;
