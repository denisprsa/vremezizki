import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import './CurrentConditionsMinMaxItem.scss';

const CurrentConditionsMinMaxItem = (props) => {
    return (
        <div className="current-conditions-min-max-item">
            <div className="current-conditions-min-max-half-item">
                <div className="current-conditions-min-max-icon">
                    <SVG src={props.icon} />
                </div>
            </div>
            <div className="current-conditions-min-max-half-item">
                <div className="current-conditions-min-max-data">
                    <div className="current-conditions-min-max-value">{props.value}</div>
                    <div className="current-conditions-min-max-unit">{props.unit}</div>
                </div>
            </div>
        </div>
    );
}

CurrentConditionsMinMaxItem.propTypes = {
    icon: PropTypes.string,
    value: PropTypes.string,
    unit: PropTypes.string
};

export default CurrentConditionsMinMaxItem;
