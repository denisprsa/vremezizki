import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';
import Box from '@material-ui/core/Box';
import Carousel from '../../carousel/carousel';
import CircleFillChart from '../../graphs/circle-fill/circle-filling';
import CirclePointerChart from '../../graphs/circle-pointer/circle-pointer';
import CircleWindChart from '../../graphs/circle-wind/circle-wind';
import PrecipitationGraph from '../../graphs/precipitation/precipitation';
import LoaderOverlay from '../../loader-overlay/loader-overlay';
import MinMaxCurrentValues from '../min-max-current-values/min-max-current-values';
import H2Title from '../../layout/titles/h2-title';

import './current-conditions.scss';

import { useContainerStyles } from '../../../layouts/custom-styles';

type Props = {

}

const CurrentConditions: FunctionComponent<Props> = () => {
  const classes = useContainerStyles();
  const { isLoadingWeatherData, weatherDataStatistic }  = useSelector((state: RootState) => ({
    isLoadingWeatherData: state.weatherStation.isLoadingWeatherData,
    weatherDataStatistic: state.weatherStation.weatherDataStatistic
  }));

  const widthAndHeight = 195;

  return (
    <>
      <Box mt={2}>
        <Carousel marginLeftMobile={10}>
          <div className={`current-conditions-items ${classes.root} ${classes.currentConditionsBorder}`}>
            <Box ml={1} mr={1}>
              <H2Title title="Temperatura"/>
              <LoaderOverlay loading={isLoadingWeatherData} width={widthAndHeight} height={widthAndHeight}>
                <CircleFillChart unit={'°C'}
                  minValue={weatherDataStatistic.temperature.min - 2}
                  value={weatherDataStatistic.temperature.current}
                  maxValue={weatherDataStatistic.temperature.max + 2}
                  widthAndHeight={widthAndHeight}/>
              </LoaderOverlay>
              <MinMaxCurrentValues loading={isLoadingWeatherData}
                max={weatherDataStatistic.temperature.max}
                maxIcon="/assets/current-conditions/thermometer-max.svg"
                min={weatherDataStatistic.temperature.min}
                minIcon="/assets/current-conditions/thermometer-min.svg"
                unit="°C"/>
            </Box>
          </div>

          <div className={`current-conditions-items ${classes.root} ${classes.currentConditionsBorder}`}>
            <Box ml={1} mr={1}>
              <H2Title title="Rosišče"/>
              <LoaderOverlay loading={isLoadingWeatherData} width={widthAndHeight} height={widthAndHeight}>
                <CircleFillChart
                  unit={'°C'}
                  minValue={weatherDataStatistic.dewPoint.min - 2}
                  value={weatherDataStatistic.dewPoint.current}
                  maxValue={weatherDataStatistic.dewPoint.max}
                  widthAndHeight={widthAndHeight}/>
              </LoaderOverlay>
              <MinMaxCurrentValues loading={isLoadingWeatherData}
                max={weatherDataStatistic.dewPoint.max}
                maxIcon="/assets/current-conditions/thermometer-max.svg"
                min={weatherDataStatistic.dewPoint.min}
                minIcon="/assets/current-conditions/thermometer-min.svg"
                unit="°C"/>
            </Box>
          </div>

          <div className={`current-conditions-items ${classes.root} ${classes.currentConditionsBorder}`}>
            <Box ml={1} mr={1}>
              <H2Title title="Vlaga"/>
              <LoaderOverlay loading={isLoadingWeatherData} width={widthAndHeight} height={widthAndHeight}>
                <CirclePointerChart
                  unit={'%'}
                  minValue={weatherDataStatistic.humidity.min}
                  value={weatherDataStatistic.humidity.current}
                  maxValue={weatherDataStatistic.humidity.max}
                  widthAndHeight={195}/>
              </LoaderOverlay>
              <MinMaxCurrentValues loading={isLoadingWeatherData}
                max={weatherDataStatistic.humidity.max}
                maxIcon="/assets/current-conditions/pressure-gauge-max.svg"
                min={weatherDataStatistic.humidity.min}
                minIcon="/assets/current-conditions/pressure-gauge-min.svg"
                unit="%"/>
            </Box>
          </div>

          <div className={`current-conditions-items ${classes.root} ${classes.currentConditionsBorder}`}>
            <Box ml={1} mr={1}>
              <H2Title title="Veter"/>
              <LoaderOverlay loading={isLoadingWeatherData} width={widthAndHeight} height={widthAndHeight}>
                <CircleWindChart
                  unit={'km/h'}
                  value={weatherDataStatistic.windSpeed.current}
                  windDirection={weatherDataStatistic.windDirection.current}
                  widthAndHeight={195}/>
              </LoaderOverlay>
              <MinMaxCurrentValues loading={isLoadingWeatherData}
                max={weatherDataStatistic.windGust.max}
                maxIcon="/assets/current-conditions/wind.svg"
                min={weatherDataStatistic.windSpeed.max}
                minIcon="/assets/current-conditions/wind.svg"
                unit="km/h"/>
            </Box>
          </div>

          <div className={`current-conditions-items ${classes.root} ${classes.currentConditionsBorder}`}>
            <Box ml={1} mr={1}>
              <H2Title title="Padavine"/>
              <LoaderOverlay loading={isLoadingWeatherData} width={widthAndHeight} height={widthAndHeight}>
                <PrecipitationGraph
                  unit={'mm'}
                  value={weatherDataStatistic.rain.current}
                  widthAndHeight={195}/>
              </LoaderOverlay>
              <MinMaxCurrentValues loading={isLoadingWeatherData}
                max={weatherDataStatistic.rain.current}
                maxIcon="/assets/current-conditions/rain.svg"
                current={0.0}
                currentIcon="/assets/current-conditions/rain.svg"
                unit="mm"/>
            </Box>
          </div>

          <div className={`current-conditions-items ${classes.root} ${classes.currentConditionsBorder}`}>
            <Box ml={1} mr={1}>
              <H2Title title="Tlak"/>
              <LoaderOverlay loading={isLoadingWeatherData} width={widthAndHeight} height={widthAndHeight}>
                <CirclePointerChart
                  unit={'hPa'}
                  minValue={weatherDataStatistic.pressure.min}
                  value={weatherDataStatistic.pressure.current}
                  maxValue={weatherDataStatistic.pressure.max}
                  widthAndHeight={195}/>
              </LoaderOverlay>
              <MinMaxCurrentValues loading={isLoadingWeatherData}
                max={weatherDataStatistic.pressure.max}
                maxIcon="/assets/current-conditions/pressure-gauge-max.svg"
                min={weatherDataStatistic.pressure.min}
                minIcon="/assets/current-conditions/pressure-gauge-min.svg"
                unit="hPa" />
            </Box>
          </div>
        </Carousel>
      </Box>
    </>
  );
};

export default CurrentConditions;
