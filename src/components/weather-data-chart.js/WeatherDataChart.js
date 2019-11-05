import React from 'react';
import * as d3 from 'd3';
import Line from './Line';
import YGrid from './YGrid';
import YAxis from './YAxis';
import ScatterPlot from './ScatterPlot';
import PropTypes from 'prop-types';
import { FormatDate } from '../../helpers/DateHelper';
import Loader from '../loader/Loader';
import DatePicker from 'react-datepicker';
import SVG from 'react-inlinesvg';
import { GetWeatherDataChartData } from '../../api/GetWeatherDataChartData';
 
import 'react-datepicker/dist/react-datepicker.css';
import './WeatherDataChart.scss';

import DatePickerIcon from './../../assets/menu-icons/calendar.svg';
import { GetWeatherStationDashboardData } from '../../helpers/CurrentWeatherData';
import { GetWindDirection } from '../../helpers/WindDirection';

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
        this.plotMarginBottom = 40;
        this.temperatureColor = '#d5202a';
        this.dewPointColor = '#5b9f49';
        this.humidityColor = '#87c404';
        this.windSpeedColor = '#4287e4';
        this.windGustsColor = '#f83';
        this.windDirectionColor = '#0053ae';
        this.rainColor = '#0053ae';
        this.pressureColor = '#1e2023';

        this.state = {
            startDate: new Date(),
            open: false,
            showGraphs: true
        }
    }

    componentDidMount() {
        this.setState({
            width: this.wrapperRef.current.clientWidth
        });

        window.addEventListener('resize', this.windowResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResize.bind(this));
    }

    windowResize() {
        if (this.wrapperRef.current) {
            this.setState({
                width: this.wrapperRef.current.clientWidth
            });
        }
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

    calculatePlotData(data) {
        let temperatureDomain = this.getYDomain(data.temperature);
        let dewPointDomain = this.getYDomain(data.dewPoint);
        let temperatureYDomain = [Math.min(temperatureDomain[0], dewPointDomain[0]) - 3, Math.max(temperatureDomain[1], dewPointDomain[1]) + 3];
        let temperatureScale = this.calculateScale(data.date, 5, temperatureYDomain);
        let temperatureMetadata = this.getMetadata(temperatureScale, this.temperatureColor);
        let dewPointMetadata = this.getMetadata(temperatureScale, this.dewPointColor);
        let temperaturePlotData = this.getPlotData(data.date, data.temperature, temperatureScale);
        let dewPointPlotData = this.getPlotData(data.date, data.dewPoint, temperatureScale);

        let humidityYDomain = this.getYDomain(data.humidity, 10, 10);
        humidityYDomain[1] = 100;
        let humidityScale = this.calculateScale(data.date, 5, humidityYDomain);
        let humidityMetadata = this.getMetadata(humidityScale, this.humidityColor);
        let humidityPlotData = this.getPlotData(data.date, data.humidity, humidityScale);

        let windSpeedDomain = this.getYDomain(data.windSpeed);
        let windGustsSpeedDomain = this.getYDomain(data.windGust);
        let windYDomain = [0, Math.max(windGustsSpeedDomain[1], windSpeedDomain[1]) + 2];
        let windScale = this.calculateScale(data.date, 5, windYDomain);
        let windSpeedMetadata = this.getMetadata(windScale, this.windSpeedColor);
        let windGustMetadata = this.getMetadata(windScale, this.windGustsColor);
        let windSpeedPlotData = this.getPlotData(data.date, data.windSpeed, windScale);
        let windGustPlotData = this.getPlotData(data.date, data.windGust, windScale);

        let windDirectionYDomain = [0, 360];
        let windDirectionScale = this.calculateScale(data.date, 7, windDirectionYDomain);
        let windDirectionMetadata = this.getMetadata(windDirectionScale, this.windDirectionColor);
        let windDirectionPlotData = this.getPlotData(data.date, data.windDirection, windDirectionScale);
        
        let rainYDomain = this.getYDomain(data.rain, 0, 2);

        let rainScale = this.calculateScale(data.date, 5, rainYDomain);
        let rainMetadata = this.getMetadata(rainScale, this.rainColor);
        let rainPlotData = this.getPlotData(data.date, data.rain, rainScale);

        let pressureYDomain = this.getYDomain(data.pressure, 2, 2);
        let pressureScale = this.calculateScale(data.date, 5, pressureYDomain);
        let pressureMetadata = this.getMetadata(pressureScale, this.pressureColor);
        let pressurePlotData = this.getPlotData(data.date, data.pressure, pressureScale);

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

    createLegendItem(gOffsetX, gOffsetY, color, text) {
        return (
            <g transform={`translate(${gOffsetX}, ${gOffsetY})`}>
                <rect width={25} height={10} fill={color} />
                <text transform="translate(30, 9)" style={{fontSize: '14px'}}>{text}</text>
            </g>
        );
    }

    createGraphLines(data) {
        let plotData = this.calculatePlotData(data);

        let temperatureLine = <Line ref={this.temperatureLineRef} metadata={plotData.temperatureMetadata} plotData={plotData.temperaturePlotData} unit="°C"/>;
        let dewPointLine = <Line ref={this.dewPointLineRef} metadata={plotData.dewPointMetadata} plotData={plotData.dewPointPlotData} unit="°C"/>;
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
        let windDirectionYGrid = <YGrid tickValues={[0,60,120,180,240,300,360]} metadata={plotData.windDirectionMetadata} />;
        let windDirectionYAxis = <YAxis tickValues={[0,60,120,180,240,300,360]} metadata={plotData.windDirectionMetadata} transform={`translate(${0},${0})`}/>;
    
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

        let plotMarginHeight = this.plotHeight + this.plotMarginBottom;

        let temperatureYGridG = <g className="axisLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${20})`}>
            { temperatureYGrid }
        </g>;

        let temperaturePlotLines = <g className="plotLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${20})`}>

            { temperatureLine }
            { dewPointLine }
        </g>;

        let temperatureAxis = <g className="axisLayer"
            transform={`translate(${30}, ${20})`}>
                
            { temperatureYAxis }
        </g>;

        let temperatureLegend = this.createLegendItem(10, this.plotHeight + 27, this.temperatureColor, 'Temperatura');
        let dewPointLegend = this.createLegendItem(130, this.plotHeight + 27, this.dewPointColor, 'Rosišče');

        // Humidity

        let humidityYGridG = <g className="axisLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${this.plotHeight + this.plotMarginBottom + 20})`}>
            { humidityYGrid }
        </g>;

        let humidityPlotLines = <g className="plotLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(0, ${this.plotHeight + this.plotMarginBottom + 20})`}>

            { humidityLine }
        </g>;

        let humidityAxis = <g className="axisLayer"
            transform={`translate(${30}, ${this.plotHeight + this.plotMarginBottom + 20})`}>
                
            { humidityYAxis }
        </g>;

        let humidityLegend = this.createLegendItem(10, this.plotHeight * 2 + this.plotMarginBottom + 27, this.humidityColor, 'Vlažnost');

        // Wind

        let windYGridG = <g className="axisLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${(this.plotHeight + this.plotMarginBottom) * 2 + 20})`}>
            { windYGrid }
        </g>;

        let windPlotLines = <g className="plotLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${(this.plotHeight + this.plotMarginBottom) * 2 + 20})`}>

            { windSpeedLine }
            { windGustScatterPlot }
        </g>;

        let windAxis = <g className="axisLayer"
            transform={`translate(${30}, ${(this.plotHeight + this.plotMarginBottom) * 2 + 20})`}>
                
            { windYAxis }
        </g>;

        let windSpeedLegend = this.createLegendItem(10, (plotMarginHeight) * 2 + (this.plotHeight) + 27, this.windSpeedColor, 'Veter');
        let windGustLegend = this.createLegendItem(80, (plotMarginHeight) * 2 + (this.plotHeight) + 27, this.windGustsColor, 'Sunki');
        
        // Wind direction

        let windDirectionYGridG = <g className="axisLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${(this.plotHeight + this.plotMarginBottom) * 3 + 20})`}>
            { windDirectionYGrid }
        </g>;

        let windDirectionPlotLines = <g className="plotLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${(this.plotHeight + this.plotMarginBottom) * 3 + 20})`}>

            { windDirectionScatterPlot }
        </g>;

        let windDirectionAxis = <g className="axisLayer"
            transform={`translate(${30}, ${(this.plotHeight + this.plotMarginBottom) * 3 + 20})`}>
                
            { windDirectionYAxis }
        </g>;
    
        let windDirectionLegend = this.createLegendItem(10, (plotMarginHeight) * 3 + (this.plotHeight) + 27, this.windDirectionColor, 'Smer vetra');
    
        // Rain

        let rainYGridG = <g className="axisLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${(this.plotHeight + this.plotMarginBottom) * 4 + 20})`}>
            { rainYGrid }
        </g>;

        let rainPlotLines = <g className="plotLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${(this.plotHeight + this.plotMarginBottom) * 4 + 20})`}>

            { rainLine }
        </g>;
        
        let rainAxis = <g className="axisLayer"
            transform={`translate(${30}, ${(this.plotHeight + this.plotMarginBottom) * 4 + 20})`}>
                
            { rainYAxis }
        </g>;
    
        let rainLegend = this.createLegendItem(10, (plotMarginHeight) * 4 + (this.plotHeight) + 27, this.rainColor, 'Padavine');

        // Pressure

        let pressureYGridG = <g className="axisLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${(this.plotHeight + this.plotMarginBottom) * 5 + 20})`}>
            { pressureYGrid }
        </g>;

        let pressurePlotLines = <g className="plotLayer"
            width={this.state.width}
            height={this.plotHeight}
            transform={`translate(${0}, ${(this.plotHeight + this.plotMarginBottom) * 5 + 20})`}>

            { pressureLine }
        </g>;
        
        let pressureAxis = <g className="axisLayer"
            transform={`translate(${50}, ${(this.plotHeight + this.plotMarginBottom) * 5 + 20})`}>
                
            { pressureYAxis }
        </g>;
    
        let pressureLegend = this.createLegendItem(10, (plotMarginHeight) * 5 + (this.plotHeight) + 27, this.pressureColor, 'Tlak');

        return {
            temperaturePlotLines,
            temperatureYGridG,
            temperatureDefs,
            temperatureLegend,

            dewPointDefs,
            temperatureAxis,
            dewPointLegend,

            humidityYGridG,
            humidityPlotLines,
            humidityAxis,
            humidityLegend,

            windYGridG,
            windPlotLines,
            windAxis,
            windSpeedLegend,
            windGustLegend,

            windDirectionYGridG,
            windDirectionPlotLines,
            windDirectionAxis,
            windDirectionLegend,

            rainYGridG,
            rainPlotLines,
            rainAxis,
            rainLegend,

            pressureYGridG,
            pressurePlotLines,
            pressureAxis,
            pressureLegend
        }
    }

    getNodeSize(item) {
        let bbox = item.node().getBBox();

        return {
            width: bbox.width,
            height: bbox.height
        }
    }

    setTextPosition(lineRef, textWrapper, unit, yOffset, textColor, otherLinePosition, isDate) {
        let otherLineYOffset = 0;
        let position = lineRef.current.getPosition();

        if (position) {
            if (isDate) {
                textWrapper.text.text(`${FormatDate(position.data.date)}`);
            } else {
                let val = position.data.value.toFixed(1);

                if (unit === '°') {
                    unit += ' ' + GetWindDirection(val);
                }

                textWrapper.text.text(`${val}${unit}`);
            }

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

            if (isDate) {
                textWrapper.g.attr('transform', `translate(${gOffset}, ${yOffset})`);
            } else {
                textWrapper.g.attr('transform', `translate(${gOffset}, ${position.y + yOffset + otherLineYOffset})`);
            }

            textWrapper.text.attr('fill', textColor);
            textWrapper.rect.attr('height', textSize.height);
            textWrapper.rect.attr('width', textSize.width + 5);
            textWrapper.rect.attr('transform', `translate(-${2}, -${textSize.height > 3 ? textSize.height - 3 : 0})`);

            return position;
        }
    }

    mousemove() {
        if (this.weatherDataChartRef.current) {
            let chartHeight = this.plotHeight + this.plotMarginBottom;

            let temperaturePosition = this.setTextPosition(this.temperatureLineRef, this.temperatureTextValue, '°C', 0, this.temperatureColor);
            
            if (temperaturePosition) {
                this.weatherDataLine.attr('transform', `translate(${temperaturePosition.x}, 20)`);
            }
    
            this.setTextPosition(this.dewPointLineRef, this.dewPointTextValue, '°C', 0, this.dewPointColor, temperaturePosition);
            this.setTextPosition(this.humidityLineRef, this.humidityTextValue, '%', chartHeight, this.humidityColor);
            let windSpeedPosition = this.setTextPosition(this.windSpeedLineRef, this.windSpeedTextValue, 'km/h', chartHeight * 2, this.windSpeedColor);
            this.setTextPosition(this.windGustLineRef, this.windGustTextValue, 'km/h', chartHeight * 2, this.windGustsColor, windSpeedPosition);
            this.setTextPosition(this.windDirectionLineRef, this.windDirectionTextValue, '°', chartHeight * 3, this.windDirectionColor);
            this.setTextPosition(this.rainLineRef, this.rainTextValue, 'mm', chartHeight * 4, this.rainColor);
            this.setTextPosition(this.pressureLineRef, this.pressureTextValue, 'hPa', chartHeight * 5, this.pressureColor);
            this.setTextPosition(this.pressureLineRef, this.date1TextValue, '', 0, this.pressureColor, undefined, true);
            this.setTextPosition(this.pressureLineRef, this.date2TextValue, '', chartHeight * 6 + 5, this.pressureColor, undefined, true);
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
        this.weatherDataLine.selectAll('*').remove();
        this.weatherDataRect = this.weatherDataLine
            .append('rect')
            .attr('width', 2)
            .attr('height', (this.plotHeight + 7 + 30) * 6 + 10)
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
        this.date1TextValue = this.addTextItemForValue();
        this.date2TextValue = this.addTextItemForValue();
    }

    setDateData(date) {
        if (date <= new Date()) {
            this.setState({
                startDate: date,
                open: false,
                showGraphs: false
            });

            GetWeatherDataChartData(date)
                .then(data => {
                    this.setState({
                        data: data,
                        showGraphs: true
                    });
                })
                .catch(err => {
                    if (err.name !== 'AbortError') {
                        console.error(err);
                    }
                });
        }
    }

    openDatePicker() {
        if (this.state.open) {
            this.setState({ open: false });
        } else {
            this.setState({ open: true });
        }
    }

    render() {
        let graphLines = {};
        let width = 0;
        let plotMarginHeight = this.plotHeight + this.plotMarginBottom;
        let loader;

        if (this.state && this.state.width && this.props.data.date && this.state.showGraphs) {
            let data;

            if (this.state.data) {
                data = GetWeatherStationDashboardData(this.state.data, false).graphData;
            } else {
                data = this.props.data;
            }

            graphLines = this.createGraphLines(data);
            this.createLegend();
            width = this.state.width;
        } else {
            loader = <Loader />
        }

        return (
            <div ref={this.wrapperRef}>
                <div className="weather-data-chart-date-picker">
                    <div className="weather-data-chart-date-picker-wrapper">
                        <div className="date-picker-chart-icon" onClick={this.openDatePicker.bind(this)}> <SVG src={DatePickerIcon} /> </div>
                        <DatePicker selected={this.state.startDate} onChange={this.setDateData.bind(this)} dateFormat="dd.MM.yyyy" open={this.state.open}/>
                    </div>
                </div>
                { loader }
                <svg className="weather-data-chart-svg" width={width} height={(this.plotHeight + 7 + 30) * 6 + 50} ref={this.weatherDataChartRef}>
                    <defs>
                        { graphLines.temperatureDefs }
                        { graphLines.dewPointDefs }
                    
                    </defs>

                    <rect height={this.plotHeight} width={width} fill="#f1f7fb" transform={`translate(${0}, ${20})`}/>
                    { graphLines.temperatureYGridG }
                    { graphLines.temperatureYGridG }
                    { graphLines.temperaturePlotLines }
                    { graphLines.temperatureAxis }
                    { graphLines.temperatureLegend }
                    { graphLines.dewPointLegend }

                    <rect height={this.plotHeight} width={width} fill="#f1f7fb" transform={`translate(${0}, ${plotMarginHeight + 20})`}/>
                    { graphLines.humidityYGridG}
                    { graphLines.humidityPlotLines}
                    { graphLines.humidityAxis}
                    { graphLines.humidityLegend}

                    <rect height={this.plotHeight} width={width} fill="#f1f7fb" transform={`translate(${0}, ${plotMarginHeight * 2 + 20})`}/>
                    { graphLines.windYGridG }
                    { graphLines.windPlotLines }
                    { graphLines.windAxis }
                    { graphLines.windSpeedLegend }
                    { graphLines.windGustLegend }

                    <rect height={this.plotHeight} width={width} fill="#f1f7fb" transform={`translate(${0}, ${plotMarginHeight * 3 + 20})`}/>
                    { graphLines.windDirectionYGridG }
                    { graphLines.windDirectionPlotLines }
                    { graphLines.windDirectionAxis }
                    { graphLines.windDirectionLegend }

                    <rect height={this.plotHeight} width={width} fill="#f1f7fb" transform={`translate(${0}, ${plotMarginHeight * 4 + 20})`}/>
                    { graphLines.rainYGridG }
                    { graphLines.rainPlotLines }
                    { graphLines.rainAxis }
                    { graphLines.rainLegend }

                    <rect height={this.plotHeight} width={width} fill="#f1f7fb" transform={`translate(${0}, ${plotMarginHeight * 5 + 20})`}/>
                    { graphLines.pressureYGridG }
                    { graphLines.pressurePlotLines }
                    { graphLines.pressureAxis }
                    { graphLines.pressureLegend }

                    <g className="weather-data-line">

                    </g>
                </svg>
            </div>
        );
    }
}

WeatherDataChart.propTypes = {
    data: PropTypes.object
};

export default WeatherDataChart;
