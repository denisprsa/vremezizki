import React from 'react';
import PropTypes from 'prop-types';

import './Widget.scss';

const Widget = (props) => {
    return (
        <div className={`dashboard-widget ${props.className}`} style={props.style}>
            { props.children }
        </div>
    );
}

Widget.propTypes = {
    children: PropTypes.any,
    style: PropTypes.any,
    className: PropTypes.string
};

export default Widget;
