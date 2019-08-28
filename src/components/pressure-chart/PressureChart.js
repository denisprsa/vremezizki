import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArcPath from '../../helpers/ArcPath';

import './PressureChart.scss';

class PressureChart extends Component {
    initialize() {
        this.rad = Math.PI / 180;
        this.minTemperature = 0;
        this.currentTemperature = 0;
        this.maxTemperature = 0;
        this.time = undefined;
        this.currentTime = 0;
    }

    componentDidMount() {
        this.animate();
    }

    componentWillUnmount() {
        this.clearRunningTimeout();
    }

    animate() {
        this.clearRunningTimeout();
        this.initialize();

        this.currentPressure = this.props.minPressure;
        this.endTemperature = this.props.currentPressure;

        let cx = Math.floor(this.props.widthAndHeight / 2);
        let cy = Math.floor(this.props.widthAndHeight / 2);
        let offset = 20;
        let r1 = cx - offset;
        let delta = Math.floor(r1 / 4);
        let r2 = r1 - delta;
        let d0 = ArcPath.path(300, 210 - 90, cx + r1 - 20, 0.75, 0.97, 'both');
        
        let { scaleLine, scaleText } = this.drawScale(r1, r2, cx, cy);
        let a = this.getA(cx, cy, r1, this.props.minPressure, this.props.maxPressure, this.currentPressure);
        let needle = this.drawNeedle(cx, cy, r1, a);

        this.setState({
            needlePoints: needle,
            outlineD: d0,
            currentValue: this.currentPressure,
            widthAndHeight: this.props.widthAndHeight,
            offset: offset,
            delta: delta,
            scaleLine: scaleLine, 
            scaleText: scaleText
        });

        this.animateNeedle(cx, cy, r1, r2);
    }

    getA(cx, cy, r1, minVal, maxVal, currentVal) {
        let scale = maxVal - minVal;
        let currentNormalized = currentVal - minVal;
        let currentPercentage = currentNormalized / scale;
        let value = 300 * currentPercentage;

        let pa = value + 60;
        let p = {
            x: cx + r1 * Math.cos(pa * this.rad),
            y: cy + r1 * Math.sin(pa * this.rad)
        };

        let x = p.x;
        let y = p.y;
        let lx = cx - x;
        let ly = cy - y;

        return Math.atan2(ly, lx) / this.rad - 120;
    }

    animateNeedle(cx, cy, r1, r2) {
        if (this.currentPressure < this.endTemperature) {
            this.timer = setTimeout(() => {
                let t = this.currentTime;

                let c = 0;
                if ((t/=1/2) < 1) {
                    c = -1/2 * (Math.sqrt(1 - t*t) - 1);
                } else {
                    c = 1/2 * (Math.sqrt(1 - (t-=2)*t) + 1);
                }

                let increase = Number(Math.abs(this.props.currentPressure - this.props.minPressure)) * Number(c);
                this.currentPressure = this.props.minPressure + increase;
                let a = this.getA(cx, cy, r1, this.props.minPressure, this.props.maxPressure, this.currentPressure);
                let needle = this.drawNeedle(cx, cy, r1, a);
            
                this.setState({
                    needlePoints: needle,
                    currentValue: this.currentPressure
                });

                this.currentTime += 0.01;
                this.animateNeedle(cx, cy, r1, r2);
            }, 11);
        }
    }

    drawNeedle(cx, cy, r1, a) {
        let nx1 = cx + 10 * Math.cos((a - 150) * this.rad);
        let ny1 = cy + 10 * Math.sin((a - 150) * this.rad);

        let nx21 = cx + (r1 + 0) * Math.cos((a - 3) * this.rad);
        let ny21 = cy + (r1 + 0) * Math.sin((a - 3) * this.rad);

        let nx22 = cx + (r1 + 15) * Math.cos((a + 0) * this.rad);
        let ny22 = cy + (r1 + 15) * Math.sin((a + 0) * this.rad);

        let nx23 = cx + (r1 + 0) * Math.cos((a + 3) * this.rad);
        let ny23 = cy + (r1 + 0) * Math.sin((a + 3) * this.rad);

        let nx3 = cx + 10 * Math.cos((a + 150) * this.rad);
        let ny3 = cy + 10 * Math.sin((a + 150) * this.rad);

        return nx1 + ',' + ny1 + ' ' + nx21 + ',' + ny21 + ' ' + nx22 + ',' + ny22 + ' ' + nx23 + ',' + ny23 + ' ' + nx3 + ',' + ny3;
    }

    drawScale(r1, r2, cx, cy) {
        let sr1 = r1 + 1;
        let sr2 = r2 - 0;
        let srT = r1 + 10;

        let scaleLine = [];
        let scaleText = [];

        let n = this.props.minPressure;
        let increase = (this.props.maxPressure - this.props.minPressure) / 10;

        for (var sa = -240; sa <= 60; sa += 30) {
            var sx1 = cx + sr1 * Math.cos(sa * this.rad);
            var sy1 = cy + sr1 * Math.sin(sa * this.rad);
            var sx2 = cx + sr2 * Math.cos(sa * this.rad);
            var sy2 = cy + sr2 * Math.sin(sa * this.rad);
            var sxT = cx + srT * Math.cos(sa * this.rad);
            var syT = cy + srT * Math.sin(sa * this.rad);

            scaleLine.push({ x1: sx1, x2: sx2, y1: sy1, y2: sy2});
            scaleText.push({ x: sxT, y: syT, text: n.toFixed(this.props.decimals)});

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
            let scaleLines = this.state.scaleLine.map((val, index) => <line key={`line-${index}`} className="pressure-chart-scale-item" x1={val.x1} x2={val.x2} y1={val.y1} y2={val.y2} />);
            let scaleTexts = this.state.scaleText.map((val, index) => <text key={`text-${index}`} className="pressure-chart-scale-item" x={val.x} y={val.y}>{val.text}</text>);
            let outlineD = this.state.outlineD;
            let needlePoints = this.state.needlePoints;
            // let mainColor = this.props.statusLineColor;
            let fontSize = this.props.fontSize;

            let circleGraphWrapperStyle = {
                width: this.state.widthAndHeight
            };
            let circleWrapperWidthHeight = this.state.widthAndHeight - (this.state.widthAndHeight * 0.55);

            return (
                <div className="pressure-chart" style={circleGraphWrapperStyle}>
                    <svg className="pressure-chart-svg" height={this.state.widthAndHeight} width={this.state.widthAndHeight} view-box="0 0 330 165">
                        <g className="pressure-chart-scale">
                            {scaleLines}
                            {scaleTexts}
                        </g>
                        <path className="pressure-chart-outline" d={outlineD} transform="translate(20,20)"/>
                        <polygon className="pressure-chart-needle" points={needlePoints}/>
                    </svg>

                    <div className="pressure-circle-wrapper" style={{ width: circleWrapperWidthHeight, height: circleWrapperWidthHeight, borderRadius: (circleWrapperWidthHeight/2)}}> </div>

                    <div className="pressure-chart-output">
                        <div className="pressure-chart-value" style={{fontSize: fontSize, lineHeight: `${Number(fontSize+10)}px`}}>{this.state.currentValue.toFixed(this.props.decimals)}</div>
                        <div className="pressure-chart-metric">{this.props.unit}</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="pressure-chart">
                    <svg className="pressure-graph-svg" view-box="0 0 330 165"></svg>
                    <div className="pressure-graph-output">--</div>
                </div>
            );
        }
    }
}

PressureChart.propTypes = {
    currentPressure: PropTypes.number,
    minPressure: PropTypes.number,
    maxPressure: PropTypes.number,
    widthAndHeight: PropTypes.number,
    statusLineColor: PropTypes.string,
    fontSize: PropTypes.string,
    unit: PropTypes.string,
    decimals: PropTypes.number
};

export default PressureChart;
