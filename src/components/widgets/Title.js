import React from 'react';
import PropTypes from 'prop-types';

import './Widget.scss';

const WidgetTitle = (props) => {
    return (
        <div className={`widget-title ${props.className ? props.className : ''}`} >{ props.title }</div>
    );
}

WidgetTitle.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string
};

export default WidgetTitle;
