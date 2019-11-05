import React from 'react';
import SVG from 'react-inlinesvg';
import { NavLink } from 'react-router-dom';

import './MainMenu.scss';

import MainMenuItem from './MainMenuItem';
import { GetCurrentTemperature } from './../../api/GetCurrentTemperature';

import HomeMenu from './../../assets/menu-icons/thermometer.svg';
import MainIcon from './../../assets/menu-icons/weather.svg';
import ChatMenu from './../../assets/menu-icons/chat.svg';
import PinMenu from './../../assets/menu-icons/pin.svg';
import SettingsMenu from './../../assets/menu-icons/settings.svg';

class MainMenu extends React.Component {
    componentDidMount() {
        GetCurrentTemperature(this.signal)
            .then(data => {
                this.setState({
                    temperature: parseInt(data.tmp)
                });
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    console.error(err);
                }
            });
    }

    render() {
        let currentTemperature = '--°';

        if (this.state && this.state.temperature) {
            currentTemperature = `${this.state.temperature}°`;
        }
        
        return (
            <div className="main-menu">
                <div className="main-menu-logo">
                    <div className="main-menu-logo-icon"><SVG src={MainIcon} /></div>
                    <div className="main-menu-logo-value">{currentTemperature}</div>
                </div>
                <div className="center-main-menu center-height">
                    <NavLink exact={true} activeClassName="is-active" to="/"><MainMenuItem icon={HomeMenu}/></NavLink>
                    <NavLink activeClassName="is-active" to="/chat"><MainMenuItem icon={ChatMenu}/></NavLink>
                    <NavLink activeClassName="is-active" to="/map"><MainMenuItem icon={PinMenu}/></NavLink>
                </div>
                <div className="center-menu-wrapper bottom-height">
                    <NavLink activeClassName="is-active" to="/settings"><MainMenuItem icon={SettingsMenu}/></NavLink>
                </div>
            </div>
        );
    }
}

export default MainMenu;