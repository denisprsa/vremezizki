import React from 'react';
import GlideSlider from '../glide-slider/GlideSlider';
import ForecastHourItem from './ForecastHourItem';
import ForecastDaysItem from './ForecastDaysItem';
import Space from '../widgets/Space';

import './ForecastChart.scss';
import GetWeatherForecastChart from '../../api/WeathherForecastChart';

class ForecastChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeDay: 0 };
        this.gliderHoursRef = React.createRef();
        this.gliderDaysRef = React.createRef();
    }

    getData() {
        GetWeatherForecastChart(this.signal)
            .then(data => {
                this.setState({ forecastData: data });
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    console.error(err);
                }
            });
    }

    componentDidMount() {
        this.getData();
    }
      
    componentWillUnmount() {
        if (this.timeoutDays) {
            clearTimeout(this.timeoutDays)
        }

        if (this.timeoutHours) {
            clearTimeout(this.timeoutHours)
        }
    }

    dayClick(index) {
        if (this.gliderDaysRef && this.gliderDaysRef.current) {
            let goToIndex = index - 2;

            if (goToIndex < 0) {
                goToIndex = 0;
            } else if (index > this.state.forecastData.days.length - 3) {
                goToIndex = this.state.forecastData.days.length - 5;
            }

            this.gliderDaysRef.current.go(`=${goToIndex}`);
            this.setState({ activeDay: index });

            // Calculate hours offset
            let count = 0;
            this.hoursPosition = 0;
            for (let days of this.state.forecastData.days) {
                if (count < index) {
                    count++;
                    this.hoursPosition += days.numberOfHours;
                }
            }
            this.gliderHoursRef.current.go(`=${this.hoursPosition}`);
        }
    }

    render() {
        let glideSliderHoursConfig = {
            startAt: 0,
            perView: 1,
            type: 'slider',
            rewind: false,
            gap: 0,
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

        let glideSliderDaysConfig = {
            startAt: 0,
            perView: 1,
            type: 'slider',
            rewind: false,
            gap: 0,
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

        let forecastHours = <div className="forecast-chart-hour-item"> Nalagam ... </div>;
        let forecastDays = <div> Nalagam ... </div>;

        if (this.state.forecastData) {
            glideSliderDaysConfig.perView = 5;
            forecastDays = this.state.forecastData.days.map((value, index) => <ForecastDaysItem clickDayItem={this.dayClick.bind(this)} key={`forecast-days-item-${index}`} data={{value, index}} isActive={index === this.state.activeDay} />);
            
            glideSliderHoursConfig.perView = 12;
            forecastHours = this.state.forecastData.hours.map((value, index) => <ForecastHourItem key={`forecast-hour-item-${index}`} data={{value, index}} isActive={value.day === this.state.activeDay} />);
        }

        return (
            <div className="forecast-chart">
                <div className="forecast-chart-days-wrapper">
                    <GlideSlider options={glideSliderDaysConfig} showNavigation={true} ref={this.gliderDaysRef}>
                        { forecastDays }
                    </GlideSlider>
                </div>

                <Space height={20}/>

                <GlideSlider options={glideSliderHoursConfig} showNavigation={false} ref={this.gliderHoursRef}>
                    { forecastHours }
                </GlideSlider>
            </div>
        );
    }
}

export default ForecastChart;
