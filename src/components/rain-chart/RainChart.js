import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArcPath from '../../helpers/ArcPath';

import './RainChart.scss';

class RainChart extends Component {
    initialize() {
        this.rad = Math.PI / 180;
        this.time = undefined;
        this.currentTime = 0;
    }

    componentDidMount() {
        this.animate();
    }

    componentWillUnmount() {
    }

    animate() {
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
                                
                                <defs>
                                    <clipPath id="rain-chart-drop">
                                        <path transform="scale(0.75), translate(32,0)" d="M68.2,6.7c0,0-62.4,70.9-62.4,124.7c0,32.3,28,58.4,62.4,58.4s62.4-26.2,62.4-58.4
                                            C130.7,77.6,68.3,6.7,68.2,6.7z M61,77.5c0.8,0,1.5,0.7,1.5,1.5v20.6c2.7-3.6,7.6-5.7,13.1-5.7c12.2,0,19.4,6.9,19.4,18.7v37.2
                                            c0,0.8-0.7,1.5-1.5,1.5H75.6c-0.8,0-1.5-0.7-1.4-1.5v-32c0-4.1-1.8-6.4-5-6.4c-5.8,0-6.7,5.7-6.7,5.7v32.7c0,0.8-0.7,1.5-1.5,1.5
                                            H43.1c-0.8,0-1.5-0.7-1.5-1.5V79c0-0.8,0.7-1.5,1.5-1.5H61z" />
                                    </clipPath>
                                </defs>

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
                    <svg className="rain-graph-svg" view-box="0 0 330 165"></svg>
                    <div className="rain-graph-output">--</div>
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
