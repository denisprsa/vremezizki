import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Widget from '../widgets/Widget';
import PressureChart from '../pressure-chart/PressureChart';
import WidgetTitle from '../widgets/Title';
import CurrentConditionsMinMax from './CurrentConditionsMinMax';

import HotIconTemperature from './../../assets/current-conditions/hot-temperature.svg';
import ColdIconTemperature from './../../assets/current-conditions/cold-temperature.svg';

class HumidityCurrentStatus extends Component {
    render() {
        return (
            <Widget className={this.props.className} style={{width: '170px'}}>
                <WidgetTitle title="Vlaga"/>
                <PressureChart
                    fontSize={'22px'}
                    widthAndHeight={170}
                    currentPressure={this.props.currentHumidity}
                    minPressure={this.props.minHumidity}
                    maxPressure={this.props.maxHumidity}
                    decimals={1}
                    unit={'%'}/>
                <CurrentConditionsMinMax minIcon={ColdIconTemperature} maxIcon={HotIconTemperature} maxValue={this.props.maxHumidity} minValue={this.props.minHumidity} unit={'%'}/>
            </Widget>
        );
    }
}

HumidityCurrentStatus.propTypes = {
    className: PropTypes.string,
    currentHumidity: PropTypes.number,
    minHumidity: PropTypes.number,
    maxHumidity: PropTypes.number
};

export default HumidityCurrentStatus;
