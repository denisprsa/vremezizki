import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';

import './current-conditions.scss';

import { useContainerStyles } from '../../../layouts/custom-styles';
import Carousel from '../../carousel/carousel';
import CircleFillChart from '../../graphs/circle-fill/circle-filling';
import CircleGaugeChart from '../../graphs/circle-gauge/circle-gauge';

type Props = {

}

const CurrentConditions: FunctionComponent<Props> = () => {
    const classes = useContainerStyles();

    return (
        <>
            <Box mt={2}>
                <Carousel marginLeftMobile={10}>
                    <div className={`current-conditions-items ${classes.root}`}>
                        <div className="current-conditions-items-title">
                            <h2>
                                Temperatura
                            </h2>
                        </div>
                        <CircleFillChart unit={'°C'} minValue={2.4} value={15.1} maxValue={22.3}/>
                    </div>

                    <div className={`current-conditions-items ${classes.root}`}>
                        <div className="current-conditions-items-title">
                            <h2>
                                Rosišče
                            </h2>
                        </div>
                        <CircleFillChart unit={'°C'} minValue={2.4} value={9.4} maxValue={22.3}/>
                    </div>

                    <div className={`current-conditions-items ${classes.root}`}>
                        <div className="current-conditions-items-title">
                            <h2>
                                Vlaga
                            </h2>
                        </div>
                        <CircleGaugeChart unit={'%'} minValue={34} value={65} maxValue={92}/>
                    </div>
                </Carousel>
            </Box>
        </>
    );
};

export default CurrentConditions;
