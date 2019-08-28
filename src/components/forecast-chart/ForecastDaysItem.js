import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import GetIcon from '../../helpers/ForecastIcon';

import './ForecastDaysItem.scss';

const ForecastDaysItem = (props) => {
    let activeClass = '';
    
    if (props.isActive) {
        activeClass = 'forecast-chart-days-active';
    }

    let dayName = props.data.value.nameDay;
    if (props.data.index === 0) {
        dayName = 'Danes';
    } else if (props.data.index === 1) {
        dayName = 'Jutri'
    }

    return (
        <div className={`forecast-chart-days-item ${activeClass} ${props.className ? props.className : ''}`} onClick={() => {props.clickDayItem(props.data.index);} }>
            <div className="forecast-chart-days-item-wrapper">
                <div className="forecast-chart-days-item-icon">
                    <SVG src={GetIcon(props.data.value.weatherType)} />
                </div>
                <div className="forecast-chart-days-item-date">
                    <div className="forecast-chart-days-item-date-name">
                        { dayName }
                    </div>
                    <div className="forecast-chart-days-item-date-format">
                        { props.data.value.date }
                    </div>
                </div>
                <div className="forecast-chart-days-item-temperature">
                    <div className="forecast-chart-days-item-temperature-max">
                        { props.data.value.highTemperature }°C
                    </div>
                    <div className="forecast-chart-days-item-temperature-min">
                        { props.data.value.lowTemperature }°C
                    </div>
                </div>
            </div>
        </div>
    );
}

ForecastDaysItem.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    data: PropTypes.object,
    isActive: PropTypes.bool,
    clickDayItem: PropTypes.func
};

export default ForecastDaysItem;
