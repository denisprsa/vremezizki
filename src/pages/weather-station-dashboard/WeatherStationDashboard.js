import React from 'react';
import Header from './Header';
import HeaderImage from './../../assets/header/summer.jpg';
import Columns from '../../components/grid/Columns';
import Row from '../../components/grid/Row';
import Warning from '../../components/warning/Warning';
import GlideSlider from '../../components/glide-slider/GlideSlider';
import TemperatureCurrentStatus from '../../components/current-conditions/Temperature';
import Space from '../../components/widgets/Space';
import DewPointCurrentStatus from '../../components/current-conditions/DewPoint';
import HumidityCurrentStatus from '../../components/current-conditions/Humidity';
import WindCurrentStatus from '../../components/current-conditions/Wind';
import RainCurrentStatus from '../../components/current-conditions/Rain';
import PressureCurrentStatus from '../../components/current-conditions/Pressure';
import CurrentWeatherGraphic from '../../components/current-weather-graphic/CurrentWeatherGraphic';
import Widget from '../../components/widgets/Widget';
import WidgetTitle from '../../components/widgets/Title';
import ForecastWords from '../../components/forecast-words/ForecastWords';
import Footer from './Footer';
import ForecastChart from '../../components/forecast-chart/ForecastChart';
import GetWeatherForecastText from '../../api/WeatherForecastText';
import Moon from '../../components/moon/Moon';
import WeatherDataChart from '../../components/weather-data-chart.js/WeatherDataChart';
import { GetWeatherDataChartData } from '../../api/GetWeatherDataChartData';

import './WeatherStationDashboard.scss';
import { GetWeatherStationDashboardData } from '../../helpers/CurrentWeatherData';

import ReactGA from 'react-ga';
import WidgetText from '../../components/widgets/Text';
ReactGA.initialize('UA-47747443-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class WeatherStationDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.controller = new AbortController();
        this.signal = this.controller.signal;
    }

    componentDidMount() {
        GetWeatherForecastText(this.signal)
            .then(data => {
                this.setState({
                    forecastText:  data.forecastText,
                    forecastNeighborCountry: data.forecastNeighborCountry,
                    weatherImage: data.weatherImage,
                    warning: data.warning,
                    outlook: data.outlook,
                    forecastDate: data.forecastDate
                });
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    console.error(err);
                }
            });

        GetWeatherDataChartData()
            .then(data => {
                this.setState({
                    weatherDataChart: data
                });
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    console.error(err);
                }
            });
    }

    componentWillUnmount() {
        this.controller.abort();
    }

    render() {
        let glideSliderCurrentConditionConfig = {
            startAt: 0,
            perView: 6,
            type: 'slider',
            gap: 10,
            bound: true,
            peek: { before: 0, after: 0 },
            dots: true,
            rewind: false,
            hoverpause: true,
            breakpoints: {
                350: {
                    startAt: 0,
                    peek: { before: 0, after: 100 },
                    perView: 1,
                },
                400: {
                    startAt: 0,
                    peek: { before: 0, after: 180 },
                    perView: 1,
                },
                600: {
                    startAt: 0,
                    peek: { before: 0, after: 50 },
                    perView: 2,
                },
                850: {
                    startAt: 0,
                    perView: 3,
                },
                1050: {
                    startAt: 0,
                    perView: 4,
                },
                1400: {
                    startAt: 0,
                    perView: 5,
                    peek: { before: 0, after: 50 }
                }
            },
        };

        let forecastTextData = { loading: true, forecastDate: '--' };
        let warningItem;

        if (this.state && this.state.forecastText) {
            forecastTextData = {
                loading: false,
                forecastText:  this.state.forecastText,
                forecastNeighborCountry: this.state.forecastNeighborCountry,
                weatherImage: this.state.weatherImage,
                outlook: this.state.outlook,
                forecastDate: this.state.forecastDate
            }
        }

        if (this.state && this.state.warning && this.state.warning.length > 0) {
            warningItem = <Row>
                <Columns className="col-12 center">
                    <Warning warningText={this.state.warning.map((val) => val).join(' ')} warningTitle="Opozorilo"/>
                </Columns>
            </Row>;
        }

        let currentData = {};
        let chartData = {};
        let isOnline = false;

        if (this.state && this.state.weatherDataChart) {
            let data = GetWeatherStationDashboardData(this.state.weatherDataChart, true);
            currentData = data.currentData;
            chartData = data.graphData;

            isOnline = currentData.dateTime < 300;

            currentData.maxCelsius = Math.max(currentData.maxTemp, currentData.maxDewPoint) + 2;
            currentData.minCelsius = Math.min(currentData.minTemp, currentData.minDewPoint) - 2;
        }

        return (
            <div className="weather-station-dashboard">
                <Header image={HeaderImage}/>

                { warningItem ? <Space height={20}/> : '' }
                { warningItem ? warningItem : '' }

                <Space height={20}/>

                <div className="glide-slider-current-conditions">

                    <div className="current-conditions-data-age">
                        <div>
                            Starost podatkov: {currentData.dateTimeString ? currentData.dateTimeString : '--'} 
                            <div className={`current-conditions-data-age-indication ${isOnline ? 'current-conditions-data-age-indication-online' : ''}`}></div>
                        </div>
                    </div>

                    <GlideSlider options={glideSliderCurrentConditionConfig} showNavigation={true}>
                        <div className="first-slider">
                            <TemperatureCurrentStatus currentTemperature={currentData.currentTemp} minTemperature={currentData.minTemp} maxTemperature={currentData.maxTemp} minTemperatureGraph={currentData.minCelsius} maxTemperatureGraph={currentData.maxCelsius}/>
                        </div>
                        <div>
                            <DewPointCurrentStatus currentDewPoint={currentData.currentDewPoint} minDewPoint={currentData.minDewPoint} maxDewPoint={currentData.maxDewPoint} minDewPointGraph={currentData.minCelsius} maxDewPointGraph={currentData.maxCelsius}/>
                        </div>
                        <div>
                            <HumidityCurrentStatus currentHumidity={currentData.currentHumidity} minHumidity={currentData.minHumidity} maxHumidity={currentData.maxHumidity}/>
                        </div>
                        <div>
                            <WindCurrentStatus currentWind={currentData.currentWindSpeed} minWind={0} maxWind={currentData.maxWindSpeed} minWindGust={0} maxWindGust={currentData.maxWindWindGust} windDirection={currentData.currentWindDirection}/>
                        </div>
                        <div>
                            <RainCurrentStatus currentRain={currentData.dayRain} maxRainRate={0.0} />
                        </div>
                        <div>
                            <PressureCurrentStatus currentPressure={currentData.currentPressure} minPressure={currentData.minPressure} maxPressure={currentData.maxPressure}/>
                        </div>
                    </GlideSlider>
                </div>

                <Space height={20}/>

                <Row>
                    <Columns className="col-12">
                        <Widget className="current-weather-graphic-align clear">
                            <Columns className="col-4 col-sm-12 center col-sm-bottom">
                                <WidgetTitle title="Trenutno stanje" />
                                <WidgetText style={{textAlign: 'center'}}  text={forecastTextData.forecastDate}></WidgetText>
                                <CurrentWeatherGraphic weatherType="partlyCloudy" />
                            </Columns>
                            <Columns className="col-8 col-sm-12">
                                <ForecastWords data={forecastTextData}/>
                            </Columns>
                        </Widget>
                    </Columns>
                </Row>

                <Space height={20}/>

                <Row>
                    <Columns className="col-12">
                        <Widget className="">
                            <WidgetTitle title="Urne napovedi" />
                            <ForecastChart />
                        </Widget>
                    </Columns>
                </Row>

                <Space height={20} />

                <Row>
                    <Columns className="col-12">
                        <Widget className="">
                            <WidgetTitle title="Luna" />
                            <Moon />
                        </Widget>
                    </Columns>
                </Row>

                <Space height={20} />

                <Row>
                    <Columns className="col-12">
                        <Widget className="no-left-right-padding">
                            <WidgetTitle title="Meritve" />
                            <WeatherDataChart data={chartData}></WeatherDataChart>
                        </Widget>
                    </Columns>
                </Row>

                <Footer />

                <div className="space-for-small-devices">
                    <Space height={50} />
                </div>
            </div>
        );
    }
}

export default WeatherStationDashboard;
