import React from 'react';
import PropTypes from 'prop-types';

import './Warning.scss';

const Warning = (props) => {
    return (
        <div className="warning-weather">
            <div className="warning-weather-header">{props.warningTitle}</div>
            <div className="warning-weather-content">{props.warningText}</div>
        </div>
    );
}

Warning.propTypes = {
    warningTitle: PropTypes.string,
    warningText: PropTypes.string
};

export default Warning;
