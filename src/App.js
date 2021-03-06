import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import './App.scss';

import MainMenu from './components/main-menu/MainMenu';
import Chat from './pages/chat/Chat';
import Maps from './pages/map/Map';
import Settings from './pages/settings/Settings';
import WeatherStationDashboard from './pages/weather-station-dashboard/WeatherStationDashboard';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.setState({ loading: false });
    }
    
    render() {
        if (this.state.loading === false) {
            return (
                <div className="main-web-page-wrapper">
                    <Router>
                        <MainMenu />
                        <div className="main-content-wrapper">
                            <Switch>
                                <Route exact path="/" component={WeatherStationDashboard} />
                                <Route path="/chat" component={Chat}/>
                                <Route path="/map" component={Maps}/>
                                <Route path="/settings" component={Settings}/>
                            </Switch>
                        </div>
                    </Router>
                </div>
            );
        }

        return (
            <div>
                Loading ...
            </div>
        )
    }
}

export default App;
