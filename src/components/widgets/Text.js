import React from 'react';
import PropTypes from 'prop-types';

import './Widget.scss';

const WidgetText = (props) => {
    return (
        <div className="widget-text">{ props.text }</div>
    );
}

WidgetText.propTypes = {
    text: PropTypes.string
};

export default WidgetText;
