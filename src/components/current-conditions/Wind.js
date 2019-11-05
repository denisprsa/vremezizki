import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Widget from '../widgets/Widget';
import WindChart from '../wind-chart/WindChart';
import WidgetTitle from '../widgets/Title';
import CurrentConditionsMinMax from './CurrentConditionsMinMax';
import { GetGraphWidth, GetGraphWidthForState } from './Helper';

import HotIconTemperature from './../../assets/current-conditions/hot-temperature.svg';
import ColdIconTemperature from './../../assets/current-conditions/cold-temperature.svg';

class WindCurrentStatus extends Component {
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
        let maxValue = this.props.maxWindGust ? this.props.maxWindGust : '--';
        let minValue = this.props.maxWind ? this.props.maxWind : '--';

        return (
            <Widget className={this.props.className} style={{width: `${this.state.width}px`}}>
                <WidgetTitle title="Veter"/>
                <WindChart
                    fontSize={'22px'}
                    widthAndHeight={this.state.width}
                    currentWind={this.props.currentWind}
                    minWind={this.props.minWind}
                    maxWind={this.props.maxWind}
                    windDirection={this.props.windDirection}
                    unit={'km/h'}/>
                <CurrentConditionsMinMax minIcon={ColdIconTemperature} maxIcon={HotIconTemperature} maxValue={maxValue} minValue={minValue} unit={'km/h'}/>
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
