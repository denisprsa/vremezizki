import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import Carousel from '../../carousel/carousel';

import './moon.scss';
import { useProperBackground } from '../../../layouts/custom-styles';

type Props = {

}

const Moon: FunctionComponent<Props> = () => {
    const classes = useProperBackground();
    const items = new Array(24).fill(1);
    const carouselItems = items.map((_, index) => {
        return (
            <div key={index}
                className={`moon-item ${classes.root} ${classes.shadow}`}>
                {index}
            </div>
        );
    });

    return (
        <Box mt={0} className="moon-wrapper">
            <Carousel marginLeftMobile={10} positionCenter={true}>
                { carouselItems }
            </Carousel>
        </Box>
    );
};

export default Moon;
