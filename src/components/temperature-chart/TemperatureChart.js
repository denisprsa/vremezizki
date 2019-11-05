import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArcPath from '../../helpers/ArcPath';
import Loader from '../loader/Loader';

import './TemperatureChart.scss';

class TemperatureChart extends Component {
    constructor(props) {
        super(props);
        this.alreadyMounted = false;
    }

    initialize() {
        this.rad = Math.PI / 180;
        this.minTemperature = 0;
        this.currentTemperature = 0;
        this.maxTemperature = 0;
        this.time = undefined;
        this.currentTime = 0;
    }

    componentDidMount() {
        if (this.props.currentTemperature !== undefined && (this.alreadyMounted === false || this.graphWidth !== this.props.widthAndHeight)) {
            this.alreadyMounted = true;
            this.animate();
        }
    }

    componentDidUpdate() {
        if (this.props.currentTemperature !== undefined && (this.alreadyMounted === false || this.graphWidth !== this.props.widthAndHeight)) {
            this.alreadyMounted = true;
            this.animate();
        }
    }

    componentWillUnmount() {
        this.clearRunningTimeout();
    }

    animate() {
        this.graphWidth = this.props.widthAndHeight;
        this.clearRunningTimeout();
        this.initialize();

        this.currentTemperature = this.props.minTemperature;
        this.endTemperature = this.props.currentTemperature;

        let cx = Math.floor(this.props.widthAndHeight / 2);
        let cy = Math.floor(this.props.widthAndHeight / 2);
        let offset = 20;
        let r1 = cx - offset;
        let delta = Math.floor(r1 / 4);
        let r2 = r1 - delta;
        let d0 = ArcPath.path(300, 210 - 90, cx + r1 - 20, 0.75, 0.97, 'both');
        let d1 = ArcPath.path(0, 210 - 90, cx + r1 - 20, 0.75, 0.97, 'both');
        
        let { scaleLine, scaleText } = this.drawScale(r1, r2, cx, cy);

        this.setState({
            outlineD: d0,
            fillD: d1,
            currentValue: this.currentTemperature,
            widthAndHeight: this.props.widthAndHeight,
            offset: offset,
            delta: delta,
            scaleLine: scaleLine, 
            scaleText: scaleText
        });

        this.animateNeedle(cx, r1);
    }

    animateNeedle(cx, r1) {
        if (this.currentTemperature < this.endTemperature) {
            this.timer = setTimeout(() => {
                let t = this.currentTime;

                let c = 0;
                if ((t/=1/2) < 1) {
                    c = -1/2 * (Math.sqrt(1 - t*t) - 1);
                } else {
                    c = 1/2 * (Math.sqrt(1 - (t-=2)*t) + 1);
                }

                let increase = Number(Math.abs(this.props.currentTemperature - this.props.minTemperature)) * Number(c);
                this.currentTemperature = this.props.minTemperature + increase;
                let percentage = (this.currentTemperature - this.props.minTemperature) / (this.props.maxTemperature - this.props.minTemperature) * 100;
                let d1 = ArcPath.path(3 * percentage, 210 - 90, cx + r1 - 20, 0.75, 0.97, 'both');
            
                this.setState({
                    currentValue: this.currentTemperature,
                    fillD: d1
                });

                this.currentTime += 0.01;
                this.animateNeedle(cx, r1);
            }, 11);
        }
    }

    drawScale(r1, r2, cx, cy) {
        let sr1 = r1 + 1;
        let sr2 = r2 - 0;
        let srT = r1 + 10;

        let scaleLine = [];
        let scaleText = [];

        let n = this.props.minTemperature;
        let increase = (this.props.maxTemperature - this.props.minTemperature) / 10;

        for (var sa = -240; sa <= 60; sa += 30) {
            var sx1 = cx + sr1 * Math.cos(sa * this.rad);
            var sy1 = cy + sr1 * Math.sin(sa * this.rad);
            var sx2 = cx + sr2 * Math.cos(sa * this.rad);
            var sy2 = cy + sr2 * Math.sin(sa * this.rad);
            var sxT = cx + srT * Math.cos(sa * this.rad);
            var syT = cy + srT * Math.sin(sa * this.rad);

            scaleLine.push({ x1: sx1, x2: sx2, y1: sy1, y2: sy2});
            scaleText.push({ x: sxT, y: syT, text: n.toFixed(1)});

            n += increase;
        }

        return {scaleLine, scaleText};
    }

    clearRunningTimeout() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    render() {
        if (this.state) {

            let scaleLines = this.state.scaleLine.map((val, index) => <line key={`line-${index}`} className="temperature-chart-scale-item" x1={val.x1} x2={val.x2} y1={val.y1} y2={val.y2} />);
            let scaleTexts = this.state.scaleText.map((val, index) => <text key={`text-${index}`} className="temperature-chart-scale-item" x={val.x} y={val.y}>{val.text}</text>);
            let outlineD = this.state.outlineD;
            let fillD = this.state.fillD;
            let fontSize = this.props.fontSize;
            let circleGraphWrapperStyle = {
                width: this.state.widthAndHeight
            };

            let currentValue = this.state.currentValue === undefined ? '--' : this.state.currentValue.toFixed(1);

            return (
                <div className="temperature-chart" style={circleGraphWrapperStyle}>
                    <svg className="temperature-chart-svg" height={this.state.widthAndHeight} width={this.state.widthAndHeight} view-box="0 0 330 165">
                        <g className="temperature-chart-scale">
                            {scaleLines}
                            {scaleTexts}
                        </g>
                        <path className="temperature-chart-outline" d={outlineD} transform="translate(20,20)"/>
                        <path className="temperature-chart-fill" d={fillD} transform="translate(20,20)"/>
                    </svg>
                    <div className="temperature-chart-output">
                        <div className="temperature-chart-value" style={{fontSize: fontSize, lineHeight: `${Number(fontSize+10)}px`}}>{currentValue}</div>
                        <div className="temperature-chart-metric">°C</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="temperature-chart">
                    <Loader />
                </div>
            );
        }
    }
}

TemperatureChart.propTypes = {
    currentTemperature: PropTypes.number,
    minTemperature: PropTypes.number,
    maxTemperature: PropTypes.number,
    widthAndHeight: PropTypes.number,
    statusLineColor: PropTypes.string,
    fontSize: PropTypes.string
};

export default TemperatureChart;
