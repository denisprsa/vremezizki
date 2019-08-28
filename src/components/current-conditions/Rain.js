import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Widget from '../widgets/Widget';
import RainChart from '../rain-chart/RainChart';
import WidgetTitle from '../widgets/Title';
import CurrentConditionsMinMax from './CurrentConditionsMinMax';

import HotIconTemperature from './../../assets/current-conditions/hot-temperature.svg';
import ColdIconTemperature from './../../assets/current-conditions/cold-temperature.svg';


class RainCurrentStatus extends Component {
    render() {
        return (
            <Widget className={this.props.className} style={{width: '170px'}}>
                <WidgetTitle title="Padavine"/>
                <RainChart
                    fontSize={'22px'}
                    widthAndHeight={170}
                    currentRain={this.props.currentRain}
                    unit={'mm'}/>
                <CurrentConditionsMinMax minIcon={ColdIconTemperature} maxIcon={HotIconTemperature} maxValue={this.props.currentRain} minValue={this.props.maxRainRate} unit={'mm'}/>
            </Widget>
        );
    }
}

RainCurrentStatus.propTypes = {
    className: PropTypes.string,
    currentRain: PropTypes.number,
    maxRainRate: PropTypes.number
};

export default RainCurrentStatus;
