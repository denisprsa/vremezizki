import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Widget from '../widgets/Widget';
import TemperatureChart from '../temperature-chart/TemperatureChart';
import WidgetTitle from '../widgets/Title';
import CurrentConditionsMinMax from './CurrentConditionsMinMax';

import HotIconTemperature from './../../assets/current-conditions/hot-temperature.svg';
import ColdIconTemperature from './../../assets/current-conditions/cold-temperature.svg';

class DewPointCurrentStatus extends Component {
    render() {
        return (
            <Widget className={this.props.className} style={{width: '170px'}}>
                <WidgetTitle title="Rosišče"/>
                <TemperatureChart
                    fontSize={'22px'}
                    widthAndHeight={170}
                    currentTemperature={this.props.currentDewPoint}
                    minTemperature={this.props.minDewPoint}
                    maxTemperature={this.props.maxDewPoint}/>
                <CurrentConditionsMinMax minIcon={ColdIconTemperature} maxIcon={HotIconTemperature} maxValue={this.props.maxDewPoint} minValue={this.props.minDewPoint} unit={'°C'}/>
            </Widget>
        );
    }
}

DewPointCurrentStatus.propTypes = {
    className: PropTypes.string,
    currentDewPoint: PropTypes.number,
    minDewPoint: PropTypes.number,
    maxDewPoint: PropTypes.number
};

export default DewPointCurrentStatus;
