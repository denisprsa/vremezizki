import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Widget from '../widgets/Widget';
import WindChart from '../wind-chart/WindChart';
import WidgetTitle from '../widgets/Title';
import CurrentConditionsMinMax from './CurrentConditionsMinMax';

import HotIconTemperature from './../../assets/current-conditions/hot-temperature.svg';
import ColdIconTemperature from './../../assets/current-conditions/cold-temperature.svg';

class WindCurrentStatus extends Component {
    render() {
        return (
            <Widget className={this.props.className} style={{width: '170px'}}>
                <WidgetTitle title="Veter"/>
                <WindChart
                    fontSize={'22px'}
                    widthAndHeight={170}
                    currentWind={this.props.currentWind}
                    minWind={this.props.minWind}
                    maxWind={this.props.maxWind}
                    windDirection={this.props.windDirection}
                    unit={'km/h'}/>
                <CurrentConditionsMinMax minIcon={ColdIconTemperature} maxIcon={HotIconTemperature} maxValue={this.props.maxWindGust} minValue={this.props.maxWind} unit={'km/h'}/>
            </Widget>
        );
    }
}

WindCurrentStatus.propTypes = {
    className: PropTypes.string,
    currentWind: PropTypes.number,
    minWind: PropTypes.number,
    maxWind: PropTypes.number,
    maxWindGust: PropTypes.number,
    minWindGust: PropTypes.number,
    windGust: PropTypes.number,
    windDirection: PropTypes.number
};

export default WindCurrentStatus;
