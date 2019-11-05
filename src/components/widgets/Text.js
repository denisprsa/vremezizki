import React from 'react';
import PropTypes from 'prop-types';

import './Widget.scss';

const WidgetText = (props) => {
    return (
        <div className="widget-text" style={props.style}>{ props.text }</div>
    );
}

WidgetText.propTypes = {
    text: PropTypes.string,
    style: PropTypes.any
};

export default WidgetText;
