import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Widget from '../widgets/Widget';
import WidgetTitle from '../widgets/Title';
import PressureChart from '../pressure-chart/PressureChart';
import CurrentConditionsMinMax from './CurrentConditionsMinMax';

import HotIconTemperature from './../../assets/current-conditions/hot-temperature.svg';
import ColdIconTemperature from './../../assets/current-conditions/cold-temperature.svg';


class PressureCurrentStatus extends Component {
    render() {
        return (
            <Widget className={this.props.className} style={{width: '170px'}}>
                <WidgetTitle title="Tlak"/>
                <PressureChart
                    fontSize={'22px'}
                    widthAndHeight={170}
                    currentPressure={this.props.currentPressure}
                    minPressure={this.props.minPressure}
                    maxPressure={this.props.maxPressure}
                    decimals={0}
                    unit={'hPa'}/>
                <CurrentConditionsMinMax minIcon={ColdIconTemperature} maxIcon={HotIconTemperature} maxValue={this.props.maxPressure} minValue={this.props.minPressure} unit={'hPa'}/>
            </Widget>
        );
    }
}

PressureCurrentStatus.propTypes = {
    className: PropTypes.string,
    currentPressure: PropTypes.number,
    maxPressure: PropTypes.number,
    minPressure: PropTypes.number
};

export default PressureCurrentStatus;
