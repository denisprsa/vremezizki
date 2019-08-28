import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import Line from './Line';
import LineFill from './LineFill';
import YGrid from './YGrid';

import './WeatherDataChart.scss';
import YAxis from './YAxis';
import ScatterPlot from './ScatterPlot';
import { thisExpression } from '@babel/types';

const createGradientStyle = (stopColor, stopOpacity) => ({
    stopColor: stopColor,
    stopOpacity: stopOpacity
});

class WeatherDataChart extends React.Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.weatherDataChartRef = React.createRef();
        this.temperatureLineRef = React.createRef();
        this.dewPointLineRef = React.createRef();
        this.humidityLineRef = React.createRef();
        this.windSpeedLineRef = React.createRef();
        this.windGustLineRef = React.createRef();
        this.windDirectionLineRef = React.createRef();
        this.rainLineRef = React.createRef();
        this.pressureLineRef = React.createRef();
        this.plotHeight = 150;
        this.plotMarginBottom = 30;
        this.temperatureColor = '#d5202a';
        this.dewPointColor = '#5b9f49';
        this.humidityColor = '#87c404';
        this.windSpeedColor = '#4287e4';
        this.windGustsColor = '#f83';
        this.windDirectionColor = '#0053ae';
        this.rainColor = '#0053ae';
        this.pressureColor = '#1e2023';
    }

    componentDidMount() {
        this.setState({
            width: this.wrapperRef.current.clientWidth
        });
    }

    calculateScale(date, scalesNice, yDomain) {
        const xScale = d3.scaleTime();
        const yScale = d3.scaleLinear().nice(scalesNice);

        const xDomain = d3.extent(date, d => d);

        xScale.domain(xDomain);
        xScale.range([0, this.state.width]);

        yScale.domain(yDomain);
        yScale.ticks(scalesNice);
        yScale.range([this.plotHeight - 0, 0]);

        return {xScale, yScale};
    }

    getYDomain(data, offsetMin = 0, offsetMax = 0) {
        return [Math.min(...data) - offsetMin, Math.max(...data) + offsetMax];
    }

    getMetadata(scale, colorLine) {
        return {
            xScale: scale.xScale,
            yScale: scale.yScale,
            plotWidth: this.state.width,
            plotHeight: this.plotHeight,
            colorLine: colorLine
        };
    }

    getPlotData(date, data, scale) {
        return data.map((value, index) => {
            return {
                id: index,
                data: { value: value, date: date[index]},
                x: scale.xScale(date[index]),
                y: scale.yScale(value)
            };
        });
    }

    calculatePlotData() {
        let temperatureDomain = this.getYDomain(this.props.data.temperature);
        let dewPointDomain = this.getYDomain(this.props.data.dewPoint);
        let temperatureYDomain = [Math.min(temperatureDomain[0], dewPointDomain[0]) - 3, Math.max(temperatureDomain[1], dewPointDomain[1]) + 3];
        let temperatureScale = this.calculateScale(this.props.data.date, 5, temperatureYDomain);
        let temperatureMetadata = this.getMetadata(temperatureScale, this.temperatureColor);
        let dewPointMetadata = this.getMetadata(temperatureScale, this.dewPointColor);
        let temperaturePlotData = this.getPlotData(this.props.data.date, this.props.data.temperature, temperatureScale);
        let dewPointPlotData = this.getPlotData(this.props.data.date, this.props.data.dewPoint, temperatureScale);

        let humidityYDomain = this.getYDomain(this.props.data.humidity, 2, 2);
        let humidityScale = this.calculateScale(this.props.data.date, 5, humidityYDomain);
        let humidityMetadata = this.getMetadata(humidityScale, this.humidityColor);
        let humidityPlotData = this.getPlotData(this.props.data.date, this.props.data.humidity, humidityScale);

        let windSpeedDomain = this.getYDomain(this.props.data.windSpeed);
        let windGustsSpeedDomain = this.getYDomain(this.props.data.windGust);
        let windYDomain = [Math.min(windGustsSpeedDomain[0], windSpeedDomain[0]) - 2, Math.max(windGustsSpeedDomain[1], windSpeedDomain[1]) + 2];
        let windScale = this.calculateScale(this.props.data.date, 5, windYDomain);
        let windSpeedMetadata = this.getMetadata(windScale, this.windSpeedColor);
        let windGustMetadata = this.getMetadata(windScale, this.windGustsColor);
        let windSpeedPlotData = this.getPlotData(this.props.data.date, this.props.data.windSpeed, windScale);
        let windGustPlotData = this.getPlotData(this.props.data.date, this.props.data.windGust, windScale);

        let windDirectionYDomain = this.getYDomain(this.props.data.windDirection, 2, 2);
        let windDirectionScale = this.calculateScale(this.props.data.date, 5, windDirectionYDomain);
        let windDirectionMetadata = this.getMetadata(windDirectionScale, this.windDirectionColor);
        let windDirectionPlotData = this.getPlotData(this.props.data.date, this.props.data.windDirection, windDirectionScale);
        
        let rainYDomain = this.getYDomain(this.props.data.rain, 1, 2);
        let rainScale = this.calculateScale(this.props.data.date, 5, rainYDomain);
        let rainMetadata = this.getMetadata(rainScale, this.rainColor);
        let rainPlotData = this.getPlotData(this.props.data.date, this.props.data.rain, rainScale);

        let pressureYDomain = this.getYDomain(this.props.data.pressure, 2, 2);
        let pressureScale = this.calculateScale(this.props.data.date, 5, pressureYDomain);
        let pressureMetadata = this.getMetadata(pressureScale, this.pressureColor);
        let pressurePlotData = this.getPlotData(this.props.data.date, this.props.data.pressure, pressureScale);

        return {
            temperatureMetadata,
            temperaturePlotData,
            dewPointPlotData,
            dewPointMetadata,
            humidityMetadata,
            humidityPlotData,
            windSpeedMetadata,
            windGustMetadata,
            windSpeedPlotData,
            windGustPlotData,
            windDirectionMetadata,
            windDirectionPlotData,
            rainMetadata,
            rainPlotData,
            pressureMetadata,
            pressurePlotData
        };
    }

    createGraphLines() {
        let plotData = this.calculatePlotData();

        let temperatureLine = <Line ref={this.temperatureLineRef} metadata={plotData.temperatureMetadata} plotData={plotData.temperaturePlotData} unit="°C"/>;
        let dewPointLine = <Line ref={this.dewPointLineRef} metadata={plotData.dewPointMetadata} plotData={plotData.dewPointPlotData} unit="°C"/>;
        // let temperatureLineFill = <LineFill defName="temperature-grad" metadata={plotData.temperatureMetadata} plotData={plotData.temperaturePlotData} />;
        // let dewPointLineFill = <LineFill defName="dew-point-grad" metadata={plotData.dewPointMetadata} plotData={plotData.dewPointPlotData} />;
        let temperatureYGrid = <YGrid metadata={plotData.temperatureMetadata} />;
        let temperatureYAxis = <YAxis metadata={plotData.temperatureMetadata} transform={`translate(${0},${0})`}/>;

        let humidityLine = <Line ref={this.humidityLineRef} metadata={plotData.humidityMetadata} plotData={plotData.humidityPlotData} unit="%"/>;
        let humidityYGrid = <YGrid metadata={plotData.humidityMetadata} />;
        let humidityYAxis = <YAxis metadata={plotData.humidityMetadata} transform={`translate(${0},${0})`}/>;

        let windSpeedLine = <Line ref={this.windSpeedLineRef} metadata={plotData.windSpeedMetadata} plotData={plotData.windSpeedPlotData} unit="km/h"/>;
        let windGustScatterPlot = <ScatterPlot ref={this.windGustLineRef} metadata={plotData.windGustMetadata} plotData={plotData.windGustPlotData}/>;
        let windYGrid = <YGrid metadata={plotData.windSpeedMetadata} />;
        let windYAxis = <YAxis metadata={plotData.windSpeedMetadata} transform={`translate(${0},${0})`}/>;

        let windDirectionScatterPlot = <ScatterPlot ref={this.windDirectionLineRef} metadata={plotData.windDirectionMetadata} plotData={plotData.windDirectionPlotData}/>;
        let windDirectionYGrid = <YGrid metadata={plotData.windDirectionMetadata} />;
        let windDirectionYAxis = <YAxis metadata={plotData.windDirectionMetadata} transform={`translate(${0},${0})`}/>;
    
        let rainLine = <Line ref={this.rainLineRef} metadata={plotData.rainMetadata} plotData={plotData.rainPlotData} unit="mm"/>;
        let rainYGrid = <YGrid metadata={plotData.rainMetadata} />;
        let rainYAxis = <YAxis metadata={plotData.rainMetadata} transform={`translate(${0},${0})`}/>;

        let pressureLine = <Line ref={this.pressureLineRef} metadata={plotData.pressureMetadata} plotData={plotData.pressurePlotData} unit="hPa"/>;
        let pressureYGrid = <YGrid metadata={plotData.pressureMetadata} />;
        let pressureYAxis = <YAxis metadata={plotData.pressureMetadata} transform={`translate(${0},${0})`}/>;
        
        let temperatureDefs = <linearGradient id="temperature-grad" x1="0%" y1="90%" x2="0%" y2="10%">
            <stop offset="0%" style={createGradientStyle(this.temperatureColor, 0)} />
            <stop offset="10%" style={createGradientStyle(this.temperatureColor, 0.05)} />
            <stop offset="50%" style={createGradientStyle(this.temperatureColor, 0.25)} />
            <stop offset="100%"  style={createGradientStyle(this.temperatureColor, 0.4)}/>
        </linearGradient>;

        let dewPointDefs = <linearGradient id="dew-point-grad" x1="0%" y1="90%" x2="0%" y2="10%">
            <stop offset="0%" style={createGradientStyle(this.dewPointColor, 0)} />
            <stop offset="10%" style={createGradientStyle(this.dewPointColor, 0.05)} />
            <stop offset="50%" style={createGradientStyle(this.dewPointColor, 0.25)} />
            <stop offset="100%"  style={createGradientStyle(this.dewPointColor, 0.4)}/>
        </linearGradient>;

        let temperatureYGridG = <g className="axisLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${0})`}>
            { temperatureYGrid }
        </g>;

        let temperaturePlotLines = <g className="plotLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${0})`}>

            { temperatureLine }
            { dewPointLine }
        </g>;

        let temperatureAxis = <g className="axisLayer"
            transform={`translate(${30}, ${0})`}>
                
            { temperatureYAxis }
        </g>;

        // Humidity

        let humidityYGridG = <g className="axisLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${this.plotHeight + this.plotMarginBottom})`}>
            { humidityYGrid }
        </g>;

        let humidityPlotLines = <g className="plotLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(0, ${this.plotHeight + this.plotMarginBottom})`}>

            { humidityLine }
        </g>;

        let humidityAxis = <g className="axisLayer"
            transform={`translate(${30}, ${this.plotHeight + this.plotMarginBottom})`}>
                
            { humidityYAxis }
        </g>;

        // Wind

        let windYGridG = <g className="axisLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${(this.plotHeight + this.plotMarginBottom) * 2})`}>
            { windYGrid }
        </g>;

        let windPlotLines = <g className="plotLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${(this.plotHeight + this.plotMarginBottom) * 2})`}>

            { windSpeedLine }
            { windGustScatterPlot }
        </g>;

        let windAxis = <g className="axisLayer"
            transform={`translate(${30}, ${(this.plotHeight + this.plotMarginBottom) * 2})`}>
                
            { windYAxis }
        </g>;
        
        // Wind direction

        let windDirectionYGridG = <g className="axisLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${(this.plotHeight + this.plotMarginBottom) * 3})`}>
            { windDirectionYGrid }
        </g>;

        let windDirectionPlotLines = <g className="plotLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${(this.plotHeight + this.plotMarginBottom) * 3})`}>

            { windDirectionScatterPlot }
        </g>;

        let windDirectionAxis = <g className="axisLayer"
            transform={`translate(${30}, ${(this.plotHeight + this.plotMarginBottom) * 3})`}>
                
            { windDirectionYAxis }
        </g>;

        // Rain

        let rainYGridG = <g className="axisLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${(this.plotHeight + this.plotMarginBottom) * 4})`}>
            { rainYGrid }
        </g>;

        let rainPlotLines = <g className="plotLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${(this.plotHeight + this.plotMarginBottom) * 4})`}>

            { rainLine }
        </g>;
        
        let rainAxis = <g className="axisLayer"
            transform={`translate(${30}, ${(this.plotHeight + this.plotMarginBottom) * 4})`}>
                
            { rainYAxis }
        </g>;

        // Pressure

        let pressureYGridG = <g className="axisLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${(this.plotHeight + this.plotMarginBottom) * 5})`}>
            { pressureYGrid }
        </g>;

        let pressurePlotLines = <g className="plotLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${(this.plotHeight + this.plotMarginBottom) * 5})`}>

            { pressureLine }
        </g>;
        
        let pressureAxis = <g className="axisLayer"
            transform={`translate(${30}, ${(this.plotHeight + this.plotMarginBottom) * 5})`}>
                
            { pressureYAxis }
        </g>;

        return {
            temperaturePlotLines,
            temperatureYGridG,
            temperatureDefs,
            dewPointDefs,
            temperatureAxis,

            humidityYGridG,
            humidityPlotLines,
            humidityAxis,

            windYGridG,
            windPlotLines,
            windAxis,

            windDirectionYGridG,
            windDirectionPlotLines,
            windDirectionAxis,

            rainYGridG,
            rainPlotLines,
            rainAxis,

            pressureYGridG,
            pressurePlotLines,
            pressureAxis
        }
    }

    getNodeSize(item) {
        let bbox = item.node().getBBox();

        return {
            width: bbox.width,
            height: bbox.height
        }
    }

    setTextPosition(lineRef, textWrapper, unit, yOffset, textColor, otherLinePosition) {
        let otherLineYOffset = 0;
        let position = lineRef.current.getPosition();
        let textSize = this.getNodeSize(textWrapper.text);
        let gOffset = 8;

        if (otherLinePosition) {
            let difference = otherLinePosition.y - position.y;
            
            if (Math.abs(difference) - textSize.height < 0) {
                let move = Math.abs(difference) - (textSize.height + 3);
                let sign = difference < 0 ? -1 : 1;
                otherLineYOffset = move * sign ;
            }
        }

        if (position.x > (this.state.width / 2)) {
            gOffset = -(textSize.width + 5 + 3);
        }

        textWrapper.text.text(`${position.data.value.toFixed(1)} ${unit}`);
        textWrapper.text.attr('fill', textColor);
        textWrapper.rect.attr('height', textSize.height);
        textWrapper.rect.attr('width', textSize.width + 5);
        textWrapper.rect.attr('transform', `translate(-${2}, -${textSize.height > 3 ? textSize.height - 3 : 0})`);
        textWrapper.g.attr('transform', `translate(${gOffset}, ${position.y + yOffset + otherLineYOffset})`);
        return position;
    }

    mousemove() {
        if (this.weatherDataChartRef.current) {
            const xy = d3.mouse(this.weatherDataChartRef.current);
            this.weatherDataLine.attr('transform', `translate(${xy[0]}, 0)`);
            let chartHeight = this.plotHeight + this.plotMarginBottom;

            let temperaturePosition = this.setTextPosition(this.temperatureLineRef, this.temperatureTextValue, '°C', 0, this.temperatureColor);
            this.setTextPosition(this.dewPointLineRef, this.dewPointTextValue, '°C', 0, this.dewPointColor, temperaturePosition);
            this.setTextPosition(this.humidityLineRef, this.humidityTextValue, '%', chartHeight, this.humidityColor);
            let windSpeedPosition = this.setTextPosition(this.windSpeedLineRef, this.windSpeedTextValue, 'km/h', chartHeight * 2, this.windSpeedColor);
            this.setTextPosition(this.windGustLineRef, this.windGustTextValue, 'km/h', chartHeight * 2, this.windGustsColor, windSpeedPosition);
            this.setTextPosition(this.windDirectionLineRef, this.windDirectionTextValue, '°', chartHeight * 3, this.windDirectionColor);
            this.setTextPosition(this.rainLineRef, this.rainTextValue, 'mm', chartHeight * 4, this.rainColor);
            this.setTextPosition(this.pressureLineRef, this.pressureTextValue, 'hPa', chartHeight * 5, this.pressureColor);
        }
    }

    addTextItemForValue() {
        let g = this.weatherDataLine.append('g').attr('class', 'weather-data-line-text-value');
        
        let rect = g.append('rect');
        let text = g.append('text');

        return {
            g,
            rect,
            text
        }
    }

    createLegend() {
        this.weatherDataLine = d3.selectAll('.weather-data-line');
        this.weatherDataRect = this.weatherDataLine
            .append('rect')
            .attr('width', 2)
            .attr('height', (this.plotHeight + 30) * 6)
            .attr('style', 'fill: #000');

        this.weatherDataChart = d3.selectAll('.weather-data-chart-svg');
        this.weatherDataChart
            .on('mouseover', () => { this.weatherDataLine.style('display', null); })
            .on('mouseout', () => { this.weatherDataLine.style('display', 'none'); })
            .on('mousemove', this.mousemove.bind(this));

        this.temperatureTextValue = this.addTextItemForValue();
        this.dewPointTextValue = this.addTextItemForValue();
        this.humidityTextValue = this.addTextItemForValue();
        this.windSpeedTextValue = this.addTextItemForValue();
        this.windGustTextValue = this.addTextItemForValue();
        this.windDirectionTextValue = this.addTextItemForValue();
        this.rainTextValue = this.addTextItemForValue();
        this.pressureTextValue = this.addTextItemForValue();
    }

    drawGraph() {
        let graphLines = this.createGraphLines();
        this.createLegend();   
        
        return (
            <svg className="weather-data-chart-svg" width={this.state.width} height={(this.plotHeight + 30) * 6} ref={this.weatherDataChartRef}>
                <defs>
                    { graphLines.temperatureDefs }
                    { graphLines.dewPointDefs }
                    
                </defs>

                { graphLines.temperatureYGridG }

                { graphLines.temperatureYGridG }
                { graphLines.temperaturePlotLines }
                { graphLines.temperatureAxis }

                { graphLines.humidityYGridG}
                { graphLines.humidityPlotLines}
                { graphLines.humidityAxis}

                { graphLines.windYGridG }
                { graphLines.windPlotLines }
                { graphLines.windAxis }

                { graphLines.rainYGridG }
                { graphLines.rainPlotLines }
                { graphLines.rainAxis }

                { graphLines.pressureYGridG }
                { graphLines.pressurePlotLines }
                { graphLines.pressureAxis }

                { graphLines.windDirectionYGridG }
                { graphLines.windDirectionPlotLines }
                { graphLines.windDirectionAxis }

                <g className="weather-data-line">

                </g>
            </svg>
        );
    }

    render() {
        let graph;

        if (this.state && this.state.width) {
            graph = this.drawGraph();
        }

        return (
            <div ref={this.wrapperRef}>
                { graph }
            </div>
        );
    }
}

WeatherDataChart.propTypes = {
    data: PropTypes.object
};

export default WeatherDataChart;
