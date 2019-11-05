import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import GetIcon from '../../helpers/ForecastIcon';

import './ForecastHourItem.scss';

function drawForecastTemperatureGraph(percentage) {
    let height1 = 150;
    let height2 = 160;

    if (window.innerWidth < 830) {
        height1 = 110;
        height2 = 120;
    }

    let startPositionX = height1 * percentage;


    let coordinates = `M6,${height2 - startPositionX - 5} `;
    coordinates += 'h10 ';
    coordinates += 'a5,5 0 0 1 5,5 ';
    coordinates += `v${startPositionX} `;
    coordinates += ' ';
    coordinates += 'h-20 ';
    coordinates += ' ';
    coordinates += `v-${startPositionX} `;
    coordinates += 'a5,5 0 0 1 5,-5 ';
    coordinates += 'z';


    return (
        <svg width={22} height={height2} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
            <path d={coordinates} fill="#0747a6" stroke="black" strokeWidth="1" />
        </svg>
    )
}

const ForecastHourItem = (props) => {
    let activeClass = '';
    
    if (props.isActive) {
        activeClass = 'forecast-chart-hour-active';
    }

    return (
        <div className={`forecast-chart-hour-item ${activeClass} ${props.className ? props.className : ''}`}>
            <div className="forecast-chart-hour-item-time">
                {props.data.value.hour}
            </div>
            <div className="forecast-chart-hour-item-icon-status">
                <div className="forecast-chart-hour-item-icon-status-wrapper">
                    <SVG src={GetIcon(props.data.value.weatherType)} />
                </div>
            </div>
            <div className="forecast-chart-hour-item-graph">
                <div className="forecast-chart-hour-item-graph-line forecast-chart-hour-item-graph-line-2"></div>
                <div className="forecast-chart-hour-item-graph-line forecast-chart-hour-item-graph-line-3"></div>
                <div className="forecast-chart-hour-item-graph-line forecast-chart-hour-item-graph-line-4"></div>
                <div className="forecast-chart-hour-item-graph-wrapper">
                    {drawForecastTemperatureGraph(props.data.value.temperaturePercentage)}
                </div>
            </div>
            <div className="forecast-chart-hour-item-data">
                <div className="forecast-chart-hour-item-value-wrapper">
                    <div className="forecast-chart-hour-item-value">
                        { props.data.value.temperature }
                    </div>
                    <div className="forecast-chart-hour-item-unit">
                        °C
                    </div>
                </div>
            </div>
            <div className="forecast-chart-hour-item-data">
                <div className="forecast-chart-hour-item-value-wrapper">
                    <div className="forecast-chart-hour-item-value">
                        { props.data.value.wind }
                    </div>
                    <div className="forecast-chart-hour-item-unit">
                        km/h
                    </div>
                </div>
            </div>
            <div className="forecast-chart-hour-item-data">
                <div className="forecast-chart-hour-item-value-wrapper">
                    <div className="forecast-chart-hour-item-value">
                        { props.data.value.windIntensity }
                    </div>
                </div>
            </div>
            <div className="forecast-chart-hour-item-data">
                <div className="forecast-chart-hour-item-value-wrapper">
                    <div className="forecast-chart-hour-item-value">
                        { props.data.value.humidity }
                    </div>
                    <div className="forecast-chart-hour-item-unit">
                        %
                    </div>
                </div>
            </div>
            <div className="forecast-chart-hour-item-data">
                <div className="forecast-chart-hour-item-value-wrapper">
                    <div className="forecast-chart-hour-item-value">
                        { props.data.value.rain }
                    </div>
                    <div className="forecast-chart-hour-item-unit">
                        mm
                    </div>
                </div>
            </div>
        </div>
    );
}

ForecastHourItem.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    data: PropTypes.object,
    isActive: PropTypes.bool
};

export default ForecastHourItem;
