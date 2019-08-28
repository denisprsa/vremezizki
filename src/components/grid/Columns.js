import React from 'react';
import PropTypes from 'prop-types';

import './Columns.scss';

const Columns = (props) => {
    return (
        <div className={`column ${props.className ? props.className : ''}`}>
            {props.children}
        </div>
    );
}

Columns.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
};

export default Columns;
