import React from 'react';
import PropTypes from 'prop-types';

import './Row.scss';

const Row = (props) => {
    return (
        <div className={`row ${props.className ? props.className : ''}`}>
            {props.children}
        </div>
    );
}

Row.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
};

export default Row;
