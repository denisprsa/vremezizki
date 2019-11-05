import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Widget from '../widgets/Widget';
import TemperatureChart from '../temperature-chart/TemperatureChart';
import WidgetTitle from '../widgets/Title';
import CurrentConditionsMinMax from './CurrentConditionsMinMax';
import { GetGraphWidth, GetGraphWidthForState } from './Helper';

import HotIconTemperature from './../../assets/current-conditions/hot-temperature.svg';
import ColdIconTemperature from './../../assets/current-conditions/cold-temperature.svg';

class DewPointCurrentStatus extends Component {
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
        let maxValue = this.props.maxDewPoint ? this.props.maxDewPoint : '--';
        let minValue = this.props.minDewPoint ? this.props.minDewPoint : '--';

        return (
            <Widget className={this.props.className} style={{width: `${this.state.width}px`}}>
                <WidgetTitle title="Rosišče"/>
                <TemperatureChart
                    fontSize={'22px'}
                    widthAndHeight={this.state.width}
                    currentTemperature={this.props.currentDewPoint}
                    minTemperature={this.props.minDewPointGraph}
                    maxTemperature={this.props.maxDewPointGraph}/>
                <CurrentConditionsMinMax minIcon={ColdIconTemperature} maxIcon={HotIconTemperature} maxValue={maxValue} minValue={minValue} unit={'°C'}/>
            </Widget>
        );
    }
}

DewPointCurrentStatus.propTypes = {
    className: PropTypes.string,
    currentDewPoint: PropTypes.number,
    minDewPoint: PropTypes.number,
    maxDewPoint: PropTypes.number,
    minDewPointGraph: PropTypes.number,
    maxDewPointGraph: PropTypes.number
};

export default DewPointCurrentStatus;
