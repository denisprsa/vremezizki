import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArcPath from '../../helpers/ArcPath';
import Loader from '../loader/Loader';

import './RainChart.scss';

class RainChart extends Component {
    constructor(props) {
        super(props);
        this.alreadyMounted = false;
    }

    initialize() {
        this.rad = Math.PI / 180;
        this.time = undefined;
        this.currentTime = 0;
    }

    componentDidMount() {
        if (this.props.currentRain !== undefined && (this.alreadyMounted === false || this.graphWidth !== this.props.widthAndHeight)) {
            this.alreadyMounted = true;
            this.animate();
        }
    }

    componentDidUpdate() {
        if (this.props.currentRain !== undefined && (this.alreadyMounted === false || this.graphWidth !== this.props.widthAndHeight)) {
            this.alreadyMounted = true;
            this.animate();
        }
    }

    componentWillUnmount() {
    }

    animate() {
        this.graphWidth = this.props.widthAndHeight;
        this.initialize();

        let cx = Math.floor(this.props.widthAndHeight / 2);
        let offset = 20;
        let r1 = cx - offset;
        let delta = Math.floor(r1 / 4);
        let d0 = ArcPath.path(359, 210 - 90, cx + r1 - 20, 0.75, 0.97, 'both');

        this.setState({
            outlineD: d0,
            currentValue: this.props.currentRain,
            widthAndHeight: this.props.widthAndHeight,
            offset: offset,
            delta: delta
        });
    }

    render() {
        if (this.state) {
            let outlineD = this.state.outlineD;
            // let mainColor = this.props.statusLineColor;
            let fontSize = this.props.fontSize;
            let circleGraphWrapperStyle = {
                width: this.state.widthAndHeight
            };

            let rainAnimation;
            let rainAmountColor = '#000';

            if (this.props.currentRain > 0) {
                rainAmountColor = '#fff';
                rainAnimation = <g className="rain-chart-wave-shape-fill">
                    <path className="rain-chart-wave-shape" d="M300,100V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4
                        c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9
                        c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V100H300z" />
                </g>;
            }

            return (
                <div className="rain-chart" style={circleGraphWrapperStyle}>
                    <div className="rain-chart-rain-animation">
                        <div className="rain-chart-rain-animation-wrapper">
                            <svg className="rain-chart-animation-svg" height={this.state.widthAndHeight} width={this.state.widthAndHeight} view-box="0 0 330 165">

                                <g>
                                    {rainAnimation}
                                </g>
                            </svg>
                        </div>
                    </div>

                    <svg className="rain-chart-svg" height={this.state.widthAndHeight} width={this.state.widthAndHeight} view-box="0 0 330 165">
                        <path className="rain-chart-outline" d={outlineD} transform="translate(20,20)"/>
                    </svg>

                    <div className="rain-chart-output">
                        <div className="rain-chart-value" style={{fontSize: fontSize, lineHeight: `${Number(fontSize+10)}px`, color: rainAmountColor}}>{this.state.currentValue.toFixed(1)}</div>
                        <div className="rain-chart-metric" style={{color: rainAmountColor}}>{this.props.unit}</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="rain-chart">
                    <Loader />
                </div>
            );
        }
    }
}

RainChart.propTypes = {
    widthAndHeight: PropTypes.number,
    currentRain: PropTypes.number,
    statusLineColor: PropTypes.string,
    fontSize: PropTypes.string,
    unit: PropTypes.string
};

export default RainChart;
