import React from 'react';
import PropTypes from 'prop-types';

import './CurrentWeatherGraphic.scss';

class CurrentWeatherGraphic extends React.Component {

    constructor(props) {
        super(props);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
      
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
      
    updateWindowDimensions() {
        let windowWidth = window.innerWidth;

        let width = 300;
        let height = 300;

        if (windowWidth < 1220) {
            height = 230;
            width = 230;
        }

        if (windowWidth < 380) {
            height = 200;
            width = 200;
        }

        let frame = this.renderDayOrNight(width, height);
        let clouds = this.renderClouds(width, height);

        this.setState({
            width: width,
            height: height,
            frame: frame,
            clouds: clouds
        });
    }

    renderDayOrNight(width, height) {
        if (this.isDaylight()) {
            return (
                <g>
                    {this.drawFrame(width, height)}
                    {this.drawDay(width, height)}
                </g>
            );
        } else {
            return (
                <g>
                    {this.drawFrame(width, height)}
                    {this.drawNight(width, height)}
                </g>
            );
        }
    }

    drawFrame(width, height) {
        let positions = '';
        let frameRandomOffset = 15;

        if (width < 300) {
            frameRandomOffset = 10;
        }

        for (let i = 0; i < 360; i += 2) {
            let t = i * Math.PI / 180;
            let randomMix = Math.random();
            let x = (width/2 - randomMix * frameRandomOffset) * Math.cos(t) + width/2;
            let y = (height/2 - randomMix * frameRandomOffset) * Math.sin(t) + height/2;

            positions += ` ${x},${y}`;
        }

        let colorSky = '#4a4a4a';
        if (this.isDaylight()) {
            colorSky = '#12769a';
        }

        return (
            <g>
                <polygon fill={colorSky} points={positions}/>
            </g>
        );
    }

    drawNight(width, height) {
        if (this.props.weatherType === 'clear' || this.props.weatherType === 'partlyCloudy') {
            return (
                <g>
                    {this.stars(width, height)}
                    {this.moon(width, height)}
                </g>
            );
        }
    }

    drawDay(width, height) {
        if (this.props.weatherType === 'clear' || this.props.weatherType === 'partlyCloudy') {
            return (
                <g>
                    {this.sun(width, height)}
                </g>
            );
        }
    }

    stars(width, height) {
        let starPositions = [];

        for (let i = 0; i < 360; i += 2) {
            let t = i * Math.PI / 180;
            let randomMix = Math.random();
            let minMax = Math.max(randomMix * (width/2) - 10, 5);
            let minMax2 = Math.max(randomMix * (height/2) - 10, 5);
            let x = (width/2 - minMax) * Math.cos(t) + width/2;
            let y = (height/2 - minMax2) * Math.sin(t) + height/2;
            starPositions.push({x: x, y: y, size: Math.random()})
        }

        let stars = starPositions.map((val) => this.drawStar(val.x, val.y, val.size * 5))

        return (
            <g>
                {stars}
            </g>
        );
    }

    drawStar(x, y, size) {
        return (
            <g key={x.toString() + y.toString()}>
                <line x1={x-size/2} y1={y} x2={x+size/2} y2={y} stroke="white" strokeWidth="1"/>
                <line x1={x} y1={y-size/2} x2={x} y2={y+size/2} stroke="white" strokeWidth="1"/>
            </g>
        );
    }

    moon(width, height) {
        let r = Math.min(width, height);
        r = r / 9;

        let smallR = Math.min(width, height);

        return (
            <g>
                <circle cx={5*r} cy={3*r} r={r} fill="#DCF9F6"/>
                <circle cx={5*r - r/5} cy={3*r - r/3} r={smallR / 50} fill="#95BFB9"/>
                <circle cx={5*r + r/5} cy={3*r + r/4} r={smallR / 60} fill="#95BFB9"/>
                <circle cx={5*r + r/4} cy={3*r - r/4} r={smallR / 100} fill="#95BFB9"/>
                <circle cx={5*r - r/3} cy={3*r + r/4} r={smallR / 85} fill="#95BFB9"/>
                <circle cx={5*r + r/1.5} cy={3*r } r={smallR / 150} fill="#95BFB9"/>
                <circle cx={5*r + r/1.5} cy={3*r + r / 1.8}  r={smallR / 170} fill="#95BFB9"/>
                <circle cx={5*r + r/6} cy={3*r + r / 1.2} r={smallR / 150} fill="#95BFB9"/>
                <circle cx={5*r - r/6} cy={3*r - r / 1.2} r={smallR / 170} fill="#95BFB9"/>
                <circle cx={5*r - r/1.8} cy={3*r - r / 4.2} r={smallR / 170} fill="#95BFB9"/>
                <circle cx={5*r + r/3.0} cy={3*r - r / 1.7} r={smallR / 170} fill="#95BFB9"/>
            </g>
        );
    }

    sun(width, height) {
        let r = Math.min(width, height);
        r = r / 9;

        let smallR = Math.min(width, height);

        return (
            <g>
                <circle cx={5*r} cy={3*r} r={smallR/7} fill="rgba(218, 178, 42, 0.2)"/>
                <circle cx={5*r} cy={3*r} r={smallR/9} fill="#dab229"/>
            </g>
        );
    }

    renderClouds(width) {
        let transform = 'scale(0.88) translate(15 -35)';

        if (width < 300) {
            transform = 'scale(0.65) translate(15 -35)';
        }

        if (width < 230) {
            transform = 'scale(0.58) translate(15 -35)';
        }

        let fillColor = '#000';
        let strokeColor = '#fff';

        if (this.isDaylight()) {
            fillColor = '#fff';
            strokeColor = '#737373';
        }

        if (this.props.weatherType === 'partlyCloudy') {
            return (
                <g>
                    {this.cloud2(transform, strokeColor, fillColor)}
                </g>
            )
        }
    }

    cloud2(transform, strokeColor, fillColor) {
        return (
            <g transform={transform}>
                <path stroke={strokeColor} strokeWidth="2" fill={fillColor} d="M273.2,265.6c0.2-2.4-1.7-4.9-4.2-5.1c2.6-1,4.5-3.4,4.9-6.1s-0.9-5.6-3.1-7.1c0.9-2.4,0.5-5,0-7.5
                    c-0.3-1.4-0.6-2.9-1.4-4.1c-0.9-1.2-2.5-1.9-3.8-1.3c1.3-3,0.9-6.6-0.9-9.3c-1.8-2.7-5-4.4-8.2-4.4c-0.5,0-1.1,0-1.4-0.4
                    c-0.2-0.2-0.3-0.6-0.3-0.9c-0.7-3.6-6.1-6.2-9.3-4.4c2.2-0.3,3.9-2.3,4.5-4.5s0.2-4.5-0.1-6.7c-0.3-2.3-0.7-4.7-2-6.6
                    c-1.3-1.9-3.9-3.1-6-2.2c2.7-0.8,4.6-3.4,5.2-6.2c0.6-2.8,0.2-5.6-0.3-8.4c-0.2-1.2-0.5-2.4-1.4-3.2c-0.9-0.8-2.6-0.5-2.9,0.6
                    c2.2-2.7,2.7-6.8,1-9.9c-1.6-3.1-5.2-5.1-8.7-4.8c0.7-4.2-1.9-8.6-5.9-10s-8.8,0.4-10.9,4c-0.9-2.6-3.6-4.1-6.3-4.4s-5.4,0.4-8,1
                    c-1.3,0.3-2.7,0.8-3.5,1.9c-0.5,0.7-0.5,1.6-0.6,2.5c-0.2,5.2,0.6,11.1,4.8,14c-2.3-0.6-4.7,1.2-5.6,3.4c-0.9,2.2-0.9,4.4-0.7,6.8
                    c-0.1-2.2-0.5-4.3-1.3-6.3c-0.4-1-0.9-2-1.7-2.6c-2-1.5-5-0.1-7.4-0.7c1.6-0.6,3.2-1.1,4.5-2.2c1.3-1.1,2.2-2.8,1.9-4.4
                    s-2.2-3-3.7-2.3c1.1-2.6-1.1-5.7-3.8-6.5c-2.7-0.8-5.7,0-8.4,0.7c-1.1,0.3-2.3,0.6-3.2,1.4c-0.3-3.3-2.9-6.1-6-7.4
                    c-3.1-1.2-6.6-1.1-9.8-0.2c-2.5,0.7-4.9,1.8-6.6,3.7c-2.3,2.8-2.7,6.6-2.8,10.2c-2.5-1.3-5.9,0.7-6.6,3.5s0.3,5.9,2.3,8
                    c-1-2.2-3.4-3.8-5.8-3.8s-4.8,1.5-5.8,3.8c0.2-2.2-2-4.1-4.1-4.2c-2.2-0.2-4.3,1-5.9,2.4c-3,2.7-4.9,6.7-5,10.8
                    c-1.1-3.5-2.5-7.3-5.7-9.1c-3.6-2-8-0.8-11.8,0.8c-1,0.4-1.9,0.8-2.7,1.6c-0.8,0.8-1.3,1.9-1.6,2.9c-1.8,6,1.1,13.1,6.6,16.1
                    c-2.6-1.4-6,0.9-6.6,3.8c-0.6,2.9,0.3,7,2.2,9.2c-0.9-2.6-3.9-3.8-6.6-4c-7-0.7-14.5,4.2-15.5,11.1c-2.3-2.9-7.2-2.5-9.6,0.3
                    s-2.5,7-1.1,10.3c1.4,3.4,4.2,6.7,7.1,9c-2.3-0.4-10,0.3-12,6.4c0,5.6,2,8.8,9.2,13.9c-8.6,0-15.5,1.4-15.5,3.2
                    c-16.5,0-29.9,2.1-29.9,4.8c0,0,15.5,0,34.7,0c0-0.4,10-0.8,22.3-0.8c-10.8,0-19.5,3.4-19.5,7.6c-9.2,0-16.7,1.1-16.7,2.4
                    c0,0.7,34,1.2,76.1,1.2c0,1.3,25.3,2.4,56.6,2.4c1,0,1.7,0.6,2.7,0.4c1-0.2,1.9-1,2.2-2c0.2-1-0.4-2.1-1.2-2.8
                    c-2-1.9-5.3-2.2-7.6-0.8c-0.2-3.6-3.6-6.8-7.2-6.8c34.6,0,62.5,0.9,62.5,2C253.8,269.2,273.2,267.6,273.2,265.6"/>
                <path stroke={strokeColor} strokeWidth="2" fill={fillColor} d="M167.7,267.6c0.5-2.7-0.2-6.3-2.3-8c-1.2-1-2.9-1.2-4.5-1.2c-3-0.1-6.7,0.7-7.7,3.5c0.5-4.2,0.8-9-1.8-12.3
                    c-1.7-2.2-4.5-3.5-7.3-3.9c-2.8-0.4-5.7,0-8.4,0.5"/>
                <path stroke={strokeColor} strokeWidth="2" fill={fillColor} d="M82.1,265.6c0.4-3.6,6.3-6.4,13.1-6.4"/>
                <path stroke={strokeColor} strokeWidth="2" fill={fillColor} d="M146.2,177.9c3.8,2.5,4.3,8.8,0.9,11.9c2.2-0.4,4.5,0.4,6,2c1.5,1.6,2.1,4,1.6,6.1c4.2-1.7,9.2-2.5,13.3-0.6
                    s6.8,7.5,4.4,11.4c1.1-0.9,2.8-0.3,3.6,0.7c0.9,1.1,1.1,2.5,1.2,3.9c0.2,2.2,0.2,4.5-0.8,6.4s-3.1,3.5-5.3,3"/>
                <path stroke={strokeColor} strokeWidth="2" fill={fillColor} d="M244.1,215.2c-2.1,1-3.7,2.8-4.5,5c-0.7,2.1-0.3,4.9,1.8,5.5c-2.7,0.3-5.2,2.1-6.3,4.7
                    c-1.1,2.5-0.7,5.6,0.9,7.8c-3.9,0.1-7.9,1.1-10.7,3.8c-2.8,2.7-4.1,7.1-2.4,10.6"/>
                <path stroke={strokeColor} strokeWidth="2" fill={fillColor} d="M98.4,210.9c1.3,1.6,2.7,3.2,3.4,5.1c0.7,1.9,0.5,4.3-1,5.7c2.7-0.2,5.4,1,7.2,3.1c1.7,2.1,2.4,5,1.7,7.6
                    c2.5,0.3,4.4,2.5,5.1,4.9c0.7,2.4,0.4,5,0.2,7.5"/>
            </g>
        );
    }

    isDaylight() {
        let date = new Date();

        if (date.getHours() > 18 || date.getHours() < 6) {
            return false;
        }

        return true;
    }

    render() {
        if (this.state && this.state.width && this.state.height) {
            let height = this.state.height;
            let width = this.state.width;

            return (
                <div className="current-status-graphic-presentation">
                    <svg width={width} height={height}>
                        {this.state && this.state.frame}
                        {this.state && this.state.clouds}
                    </svg>
                </div>
            );
        } else {
            return (
                <div className="current-status-graphic-presentation">
                    Loading...
                </div>
            );
        }
    }
}

CurrentWeatherGraphic.propTypes = {
    weatherType: PropTypes.string
};

export default CurrentWeatherGraphic;
