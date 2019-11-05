import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArcPath from '../../helpers/ArcPath';
import Loader from '../loader/Loader';

import './WindChart.scss';

class WindChart extends Component {
    constructor(props) {
        super(props);
        this.alreadyMounted = false;
    }

    initialize() {
        this.rad = Math.PI / 180;
        this.minWind = 0;
        this.currentWind = 0;
        this.maxWind = 0;
        this.time = undefined;
        this.currentTime = 0;
    }

    componentDidMount() {
        if (this.props.currentWind !== undefined && (this.alreadyMounted === false || this.graphWidth !== this.props.widthAndHeight)) {
            this.alreadyMounted = true;
            this.animate();
        }
    }

    componentDidUpdate() {
        if (this.props.currentWind !== undefined && (this.alreadyMounted === false || this.graphWidth !== this.props.widthAndHeight)) {
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

        this.currentDirection = -90;
        this.endWind = this.props.windDirection;

        let cx = Math.floor(this.props.widthAndHeight / 2);
        let cy = Math.floor(this.props.widthAndHeight / 2);
        let offset = 20;
        let r1 = cx - offset;
        let delta = Math.floor(r1 / 4);
        let r2 = r1 - delta;
        let d0 = ArcPath.path(359, 0 - 90, cx + r1 - 20, 0.75, 0.97, 'both');
        let direction = this.drawDirection(0 - 90, r1, r2, cx, cy);
        let { scaleLine, scaleText } = this.drawScale(r1, r2, cx, cy);

        this.setState({
            currentValue: this.currentWind,
            widthAndHeight: this.props.widthAndHeight,
            outlineD: d0,
            direction: direction,
            scaleLine: scaleLine,
            scaleText: scaleText
        });

        this.animateNeedle(cx, cy, r1, r2);
    }

    animateNeedle(cx, cy, r1, r2) {
        if (this.currentDirection < this.endWind) {
            this.timer = setTimeout(() => {
                let t = this.currentTime;

                let c = 0;
                if ((t/=1/2) < 1) {
                    c = -1/2 * (Math.sqrt(1 - t*t) - 1);
                } else {
                    c = 1/2 * (Math.sqrt(1 - (t-=2)*t) + 1);
                }

                let increaseWind = Number(Math.abs(this.props.currentWind - this.props.minWind)) * Number(c);
                this.currentWind = this.props.minWind + increaseWind;

                let increaseDirection = Number(this.props.windDirection) * Number(c);
                this.currentDirection = increaseDirection;

                let direction = this.drawDirection(increaseDirection - 90, r1, r2, cx, cy);

                this.setState({
                    currentValue: this.currentWind,
                    direction: direction
                });

                this.currentTime += 0.01;
                this.animateNeedle(cx, cy, r1, r2);
            }, 11);
        }
    }

    drawScale(r1, r2, cx, cy) {
        let sr1 = r1 + 1;
        let sr2 = r2 - 5;
        let srT = r1 + 10;

        let scaleLine = [];
        let scaleText = [];
        
        let directions = {
            0: 'S',
            45: 'SV',
            90: 'V',
            135: 'JV',
            180: 'J',
            225: 'JZ',
            270: 'Z',
            315: 'SZ'
        }
        let n = 0;
        for (let sa = -90; sa <= 360 - 90; sa += 45) {
            let sx1 = cx + sr1 * Math.cos(sa * this.rad);
            let sy1 = cy + sr1 * Math.sin(sa * this.rad);
            let sx2 = cx + sr2 * Math.cos(sa * this.rad);
            let sy2 = cy + sr2 * Math.sin(sa * this.rad);
            let sxT = cx + srT * Math.cos(sa * this.rad);
            let syT = cy + srT * Math.sin(sa * this.rad);
        
            scaleLine.push({ x1: sx1, x2: sx2, y1: sy1, y2: sy2});
            scaleText.push({ x: sxT, y: syT, text: directions[n]});
        
            n += 45;
        }

        return {scaleLine, scaleText};
    }

    drawDirection(direction, r1, r2, cx, cy) {
        let dr1 = r1 + 1;
        let dr2 = r2 - 12;
        let dr3 = r1 + 1;
        let dr4 = r1 - 7;
        let dx2 = cx + dr2 * Math.cos(direction * this.rad);
        let dy2 = cy + dr2 * Math.sin(direction * this.rad);
        let dx1 = cx + dr1 * Math.cos((direction - 10) * this.rad);
        let dy1 = cy + dr1 * Math.sin((direction - 10) * this.rad);
        let dx3 = cx + dr3 * Math.cos((direction + 10) * this.rad);
        let dy3 = cy + dr3 * Math.sin((direction + 10) * this.rad);
        let dx4 = cx + dr4 * Math.cos(direction * this.rad);
        let dy4 = cy + dr4 * Math.sin(direction * this.rad);

        return {
            dx1: dx1,
            dy1: dy1,
            dx2: dx2,
            dy2: dy2,
            dx3: dx3,
            dy3: dy3,
            dx4: dx4,
            dy4: dy4
        }
    }

    clearRunningTimeout() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    render() {
        if (this.state) {
            let scaleLines = this.state.scaleLine.map((val, index) => <line key={`line-${index}`} className="wind-chart-scale-item" x1={val.x1} x2={val.x2} y1={val.y1} y2={val.y2} />);
            let scaleTexts = this.state.scaleText.map((val, index) => <text key={`text-${index}`} className="wind-chart-scale-item" x={val.x} y={val.y}>{val.text}</text>);
            let outlineD = this.state.outlineD;
            let dir = this.state.direction;
            // let mainColor = this.props.statusLineColor;
            let fontSize = this.props.fontSize;
            let direction =  dir.dx1 + ',' + dir.dy1 + ' ' + dir.dx2 + ',' + dir.dy2 + ' ' + dir.dx3 + ',' + dir.dy3 + ' ' + dir.dx4 + ',' + dir.dy4;

            let circleGraphWrapperStyle = {
                width: this.state.widthAndHeight
            };

            return (
                <div className="wind-chart" style={circleGraphWrapperStyle}>
                    <svg className="wind-chart-svg" height={this.state.widthAndHeight} width={this.state.widthAndHeight} view-box="0 0 330 165">
                        <g className="wind-chart-scale">
                            {scaleLines}
                            {scaleTexts}
                        </g>
                        
                        <path className="wind-chart-outline" d={outlineD} transform="translate(20,20)"/>
                        <polygon className="wind-direction" points={direction} />
                        <line style={{strokeWidth: 2}} x1={dir.dx1} y1={dir.dy1} x2={dir.dx2} y2={dir.dy2} />
                        <line style={{strokeWidth: 2}} x1={dir.dx1} y1={dir.dy1} x2={dir.dx4} y2={dir.dy4} />
                        <line style={{strokeWidth: 2}} x1={dir.dx4} y1={dir.dy4} x2={dir.dx3} y2={dir.dy3} />
                        <line style={{strokeWidth: 2}} x1={dir.dx3} y1={dir.dy3} x2={dir.dx2} y2={dir.dy2} />
                    </svg>
                    <div className="wind-chart-output">
                        <div className="wind-chart-value" style={{fontSize: fontSize, lineHeight: `${Number(fontSize+10)}px`}}>{this.state.currentValue.toFixed(1)}</div>
                        <div className="wind-chart-metric">km/h</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="wind-chart">
                    <Loader />
                </div>
            );
        }
    }
}

WindChart.propTypes = {
    currentWind: PropTypes.number,
    minWind: PropTypes.number,
    maxWind: PropTypes.number,
    windDirection: PropTypes.number,
    widthAndHeight: PropTypes.number,
    statusLineColor: PropTypes.string,
    fontSize: PropTypes.string,
};

export default WindChart;
