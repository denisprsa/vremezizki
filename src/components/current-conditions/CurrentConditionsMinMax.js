import React from 'react';
import PropTypes from 'prop-types';

import './CurrentConditionsMinMax.scss';
import CurrentConditionsMinMaxItem from './CurentConditionsMinMaxItem';
import Space from '../widgets/Space';

const CurrentConditionsMinMax = (props) => {
    return (
        <div className="current-conditions-min-max">
            <div className="current-conditions-max">
                <CurrentConditionsMinMaxItem value={String(props.maxValue)} icon={props.maxIcon} unit={props.unit}/>
            </div>
            <Space height={5}/>
            <div className="current-conditions-min">
                <CurrentConditionsMinMaxItem value={String(props.minValue)} icon={props.minIcon} unit={props.unit}/>
            </div>
        </div>
    );
}

CurrentConditionsMinMax.propTypes = {
    minIcon: PropTypes.string,
    maxIcon: PropTypes.string,
    minValue: PropTypes.any,
    maxValue: PropTypes.any,
    unit: PropTypes.string
};

export default CurrentConditionsMinMax;
