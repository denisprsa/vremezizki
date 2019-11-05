import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Widget from '../widgets/Widget';
import PressureChart from '../pressure-chart/PressureChart';
import WidgetTitle from '../widgets/Title';
import CurrentConditionsMinMax from './CurrentConditionsMinMax';
import { GetGraphWidth, GetGraphWidthForState } from './Helper';

import HotIconTemperature from './../../assets/current-conditions/hot-temperature.svg';
import ColdIconTemperature from './../../assets/current-conditions/cold-temperature.svg';

class HumidityCurrentStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: GetGraphWidth(window.innerWidth)
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.windowResize.bind(this));
        this.windowResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResize.bind(this));
    }

    windowResize() {
        let windowWidth = window.innerWidth;
        let itemWidth = GetGraphWidthForState(windowWidth, this.itemWidthState);

        if (itemWidth) {
            this.setState({width: itemWidth});
        }
    }

    render() {
        let maxValue = this.props.maxHumidity ? this.props.maxHumidity : '--';
        let minValue = this.props.minHumidity ? this.props.minHumidity : '--';

        return (
            <Widget className={this.props.className} style={{width: `${this.state.width}px`}}>
                <WidgetTitle title="Vlaga"/>
                <PressureChart
                    fontSize={'22px'}
                    widthAndHeight={this.state.width}
                    currentPressure={this.props.currentHumidity}
                    minPressure={this.props.minHumidity}
                    maxPressure={this.props.maxHumidity}
                    decimals={1}
                    unit={'%'}/>
                <CurrentConditionsMinMax minIcon={ColdIconTemperature} maxIcon={HotIconTemperature} maxValue={maxValue} minValue={minValue} unit={'%'}/>
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
