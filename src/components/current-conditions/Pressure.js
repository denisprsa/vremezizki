import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Widget from '../widgets/Widget';
import WidgetTitle from '../widgets/Title';
import PressureChart from '../pressure-chart/PressureChart';
import CurrentConditionsMinMax from './CurrentConditionsMinMax';
import { GetGraphWidth, GetGraphWidthForState } from './Helper';

import HotIconTemperature from './../../assets/current-conditions/hot-temperature.svg';
import ColdIconTemperature from './../../assets/current-conditions/cold-temperature.svg';

class PressureCurrentStatus extends Component {
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
        let maxValue = this.props.maxPressure ? this.props.maxPressure : '--';
        let minValue = this.props.minPressure ? this.props.minPressure : '--';

        return (
            <Widget className={this.props.className} style={{width: `${this.state.width}px`}}>
                <WidgetTitle title="Tlak"/>
                <PressureChart
                    fontSize={'22px'}
                    widthAndHeight={this.state.width}
                    currentPressure={this.props.currentPressure}
                    minPressure={this.props.minPressure}
                    maxPressure={this.props.maxPressure}
                    decimals={0}
                    unit={'hPa'}/>
                <CurrentConditionsMinMax minIcon={ColdIconTemperature} maxIcon={HotIconTemperature} maxValue={maxValue} minValue={minValue} unit={'hPa'}/>
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
