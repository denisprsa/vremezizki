import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Widget from '../widgets/Widget';
import TemperatureChart from '../temperature-chart/TemperatureChart';
import WidgetTitle from '../widgets/Title';
import CurrentConditionsMinMax from './CurrentConditionsMinMax';
import { GetGraphWidth, GetGraphWidthForState } from './Helper';

import HotIconTemperature from './../../assets/current-conditions/hot-temperature.svg';
import ColdIconTemperature from './../../assets/current-conditions/cold-temperature.svg';


class TemperatureCurrentStatus extends Component {
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
        let maxValue = this.props.maxTemperature ? this.props.maxTemperature : '--';
        let minValue = this.props.minTemperature ? this.props.minTemperature : '--';

        return (
            <Widget className={this.props.className} style={{width: `${this.state.width}px`}}>
                <WidgetTitle title="Temperatura"/>
                <TemperatureChart
                    fontSize={'22px'}
                    widthAndHeight={this.state.width}
                    currentTemperature={this.props.currentTemperature}
                    minTemperature={this.props.minTemperatureGraph}
                    maxTemperature={this.props.maxTemperatureGraph}/>
                <CurrentConditionsMinMax minIcon={ColdIconTemperature} maxIcon={HotIconTemperature} maxValue={maxValue} minValue={minValue} unit={'°C'}/>
            </Widget>
        );
    }
}

TemperatureCurrentStatus.propTypes = {
    className: PropTypes.string,
    currentTemperature: PropTypes.number,
    minTemperature: PropTypes.number,
    maxTemperature: PropTypes.number,
    minTemperatureGraph: PropTypes.number,
    maxTemperatureGraph: PropTypes.number
};

export default TemperatureCurrentStatus;
