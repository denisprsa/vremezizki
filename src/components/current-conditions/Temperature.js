import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Widget from '../widgets/Widget';
import TemperatureChart from '../temperature-chart/TemperatureChart';
import WidgetTitle from '../widgets/Title';
import CurrentConditionsMinMax from './CurrentConditionsMinMax';

import HotIconTemperature from './../../assets/current-conditions/hot-temperature.svg';
import ColdIconTemperature from './../../assets/current-conditions/cold-temperature.svg';

class TemperatureCurrentStatus extends Component {
    render() {
        return (
            <Widget className={this.props.className} style={{width: '170px'}}>
                <WidgetTitle title="Temperatura"/>
                <TemperatureChart
                    fontSize={'22px'}
                    widthAndHeight={170}
                    currentTemperature={this.props.currentTemperature}
                    minTemperature={this.props.minTemperature}
                    maxTemperature={this.props.maxTemperature}/>
                <CurrentConditionsMinMax minIcon={ColdIconTemperature} maxIcon={HotIconTemperature} maxValue={this.props.maxTemperature} minValue={this.props.minTemperature} unit={'°C'}/>
            </Widget>
        );
    }
}

TemperatureCurrentStatus.propTypes = {
    className: PropTypes.string,
    currentTemperature: PropTypes.number,
    minTemperature: PropTypes.number,
    maxTemperature: PropTypes.number
};

export default TemperatureCurrentStatus;
