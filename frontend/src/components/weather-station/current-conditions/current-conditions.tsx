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
    const { isLoadingWeatherData }  = useSelector((state: RootState) => ({
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
                                    minValue={2.4}
                                    value={15.1}
                                    maxValue={22.3}
                                    widthAndHeight={widthAndHeight}/>
                            </LoaderOverlay>
                            <MinMaxCurrentValues loading={isLoadingWeatherData}
                                max={22.3}
                                maxIcon="/assets/current-conditions/thermometer-max.svg"
                                min={2.4}
                                minIcon="/assets/current-conditions/thermometer-min.svg"
                                unit="°C"/>
                        </Box>
                    </div>

                    <div className={`current-conditions-items ${classes.root} ${classes.currentConditionsBorder}`}>
                        <Box ml={1} mr={1}>
                            <H2Title title="Rosišče"/>
                            <LoaderOverlay loading={isLoadingWeatherData} width={widthAndHeight} height={widthAndHeight}>
                                <CircleFillChart unit={'°C'} minValue={-2.4} value={9.4} maxValue={19.3} widthAndHeight={widthAndHeight}/>
                            </LoaderOverlay>
                            <MinMaxCurrentValues loading={isLoadingWeatherData}
                                max={19.3}
                                maxIcon="/assets/current-conditions/thermometer-max.svg"
                                min={-2.4}
                                minIcon="/assets/current-conditions/thermometer-min.svg"
                                unit="°C"/>
                        </Box>
                    </div>

                    <div className={`current-conditions-items ${classes.root} ${classes.currentConditionsBorder}`}>
                        <Box ml={1} mr={1}>
                            <H2Title title="Vlaga"/>
                            <LoaderOverlay loading={isLoadingWeatherData} width={widthAndHeight} height={widthAndHeight}>
                                <CirclePointerChart unit={'%'} minValue={34} value={65} maxValue={92} widthAndHeight={195}/>
                            </LoaderOverlay>
                            <MinMaxCurrentValues loading={isLoadingWeatherData}
                                max={92}
                                maxIcon="/assets/current-conditions/pressure-gauge-max.svg"
                                min={34}
                                minIcon="/assets/current-conditions/pressure-gauge-min.svg"
                                unit="%"/>
                        </Box>
                    </div>

                    <div className={`current-conditions-items ${classes.root} ${classes.currentConditionsBorder}`}>
                        <Box ml={1} mr={1}>
                            <H2Title title="Veter"/>
                            <LoaderOverlay loading={isLoadingWeatherData} width={widthAndHeight} height={widthAndHeight}>
                                <CircleWindChart unit={'km/h'} value={12.4} windDirection={200} widthAndHeight={195}/>
                            </LoaderOverlay>
                            <MinMaxCurrentValues loading={isLoadingWeatherData}
                                max={45.6}
                                maxIcon="/assets/current-conditions/wind.svg"
                                current={19.3}
                                currentIcon="/assets/current-conditions/wind.svg"
                                unit="km/h"/>
                        </Box>
                    </div>

                    <div className={`current-conditions-items ${classes.root} ${classes.currentConditionsBorder}`}>
                        <Box ml={1} mr={1}>
                            <H2Title title="Padavine"/>
                            <LoaderOverlay loading={isLoadingWeatherData} width={widthAndHeight} height={widthAndHeight}>
                                <PrecipitationGraph unit={'mm'} value={10.4} widthAndHeight={195}/>
                            </LoaderOverlay>
                            <MinMaxCurrentValues loading={isLoadingWeatherData}
                                max={201.6}
                                maxIcon="/assets/current-conditions/rain.svg"
                                current={0.8}
                                currentIcon="/assets/current-conditions/rain.svg"
                                unit="mm"/>
                        </Box>
                    </div>

                    <div className={`current-conditions-items ${classes.root} ${classes.currentConditionsBorder}`}>
                        <Box ml={1} mr={1}>
                            <H2Title title="Tlak"/>
                            <LoaderOverlay loading={isLoadingWeatherData} width={widthAndHeight} height={widthAndHeight}>
                                <CirclePointerChart unit={'hPa'} minValue={1009} value={1012} maxValue={1019} widthAndHeight={195}/>
                            </LoaderOverlay>
                            <MinMaxCurrentValues loading={isLoadingWeatherData}
                                max={1019.9}
                                maxIcon="/assets/current-conditions/pressure-gauge-max.svg"
                                min={1009.2}
                                minIcon="/assets/current-conditions/pressure-gauge-min.svg"
                                unit="hPa"/>
                        </Box>
                    </div>
                </Carousel>
            </Box>
        </>
    );
};

export default CurrentConditions;
