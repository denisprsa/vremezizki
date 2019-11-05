import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Widget from '../widgets/Widget';
import RainChart from '../rain-chart/RainChart';
import WidgetTitle from '../widgets/Title';
import CurrentConditionsMinMax from './CurrentConditionsMinMax';
import { GetGraphWidth, GetGraphWidthForState } from './Helper';

import HotIconTemperature from './../../assets/current-conditions/hot-temperature.svg';
import ColdIconTemperature from './../../assets/current-conditions/cold-temperature.svg';

class RainCurrentStatus extends Component {
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
        let maxValue = this.props.currentRain ? this.props.currentRain.toFixed(1) : '--';
        let minValue = this.props.maxRainRate ? this.props.maxRainRate.toFixed(1) : '--';

        return (
            <Widget className={this.props.className} style={{width: `${this.state.width}px`}}>
                <WidgetTitle title="Padavine"/>
                <RainChart
                    fontSize={'22px'}
                    widthAndHeight={this.state.width}
                    currentRain={this.props.currentRain}
                    unit={'mm'}/>
                <CurrentConditionsMinMax minIcon={ColdIconTemperature} maxIcon={HotIconTemperature} maxValue={maxValue} minValue={minValue} unit={'mm'}/>
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
