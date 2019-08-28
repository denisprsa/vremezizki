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
                    outlook: data.outlook
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
            hoverpause: true,
            breakpoints: {
                530: {
                    startAt: 0,
                    perView: 2,
                },
                720: {
                    startAt: 0,
                    perView: 3,
                },
                1000: {
                    startAt: 0,
                    perView: 4,
                },
                1400: {
                    startAt: 0,
                    perView: 5,
                }
            },
        };

        let forecastTextData = { loading: true };
        let warningItem;

        if (this.state && this.state.forecastText) {
            forecastTextData = {
                loading: false,
                forecastText:  this.state.forecastText,
                forecastNeighborCountry: this.state.forecastNeighborCountry,
                weatherImage: this.state.weatherImage,
                outlook: this.state.outlook
            }
        }

        if (this.state && this.state.warning.length > 0) {
            warningItem = <Row>
                <Columns className="col-12 center">
                    <Warning warningText={this.state.warning.map((val) => val).join(' ')} warningTitle="Opozorilo"/>
                </Columns>
            </Row>;
        }

        let data = {
            temperature: [],
            dewPoint: [],
            humidity: [],
            windSpeed: [],
            windGust: [],
            windDirection: [],
            pressure: [],
            rain: [],
            date: []
        };
        let weatherDataChart;

        if (this.state && this.state.weatherDataChart) {
            let lastDate;

            for (let item of this.state.weatherDataChart) {
                data.temperature.push(item.tmp);
                data.dewPoint.push(item.ros);
                data.humidity.push(item.vla);
                data.windDirection.push(item.vetersm);
                data.windGust.push(item.vetersu);
                data.windSpeed.push(item.veter);
                data.pressure.push(item.tlak);
                data.rain.push(item.pad);
                data.date.push(new Date(item.dat.replace(' ', 'T')));
                lastDate = new Date(item.dat.replace(' ', 'T'));
            }

            lastDate.setMinutes(lastDate.getMinutes() + 1);
    
            data.date.push(lastDate);

            let endDayDate = new Date();
            endDayDate.setHours(23);
            endDayDate.setMinutes(59);
            endDayDate.setSeconds(59);
    
            data.date.push(endDayDate);
        }

        

        return (
            <div className="weather-station-dashboard">
                <Header image={HeaderImage}/>

                { warningItem ? <Space height={20}/> : '' }
                { warningItem ? warningItem : '' }

                <Space height={20}/>

                <div className="glide-slider-current-conditions">
                    <GlideSlider options={glideSliderCurrentConditionConfig} showNavigation={false}>
                        <div className="first-slider">
                            <TemperatureCurrentStatus currentTemperature={25.1} minTemperature={14.4} maxTemperature={31.3}/>
                        </div>
                        <div>
                            <DewPointCurrentStatus currentDewPoint={20.1} minDewPoint={5.1} maxDewPoint={24.1}/>
                        </div>
                        <div>
                            <HumidityCurrentStatus currentHumidity={78.1} minHumidity={40.1} maxHumidity={99.1}/>
                        </div>
                        <div>
                            <WindCurrentStatus currentWind={14.3} minWind={0} maxWind={32.1} minWindGust={25.4} maxWindGust={69.4} windDirection={168}/>
                        </div>
                        <div>
                            <RainCurrentStatus currentRain={5.2} maxRainRate={88.9} />
                        </div>
                        <div>
                            <PressureCurrentStatus currentPressure={1016.3} minPressure={1009.3} maxPressure={1021.3}/>
                        </div>
                    </GlideSlider>
                </div>

                <Space height={20}/>

                <Row>
                    <Columns className="col-12">
                        <Widget className="current-weather-graphic-align clear">
                            <Columns className="col-4 center">
                                <WidgetTitle title="Trenutno stanje" />
                                <CurrentWeatherGraphic weatherType="partlyCloudy" />
                            </Columns>
                            <Columns className="col-8">
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
                            <WeatherDataChart data={data}></WeatherDataChart>
                        </Widget>
                    </Columns>
                </Row>

                <Footer />
            </div>
        );
    }
}

export default WeatherStationDashboard;
