import React from 'react';
import PropTypes from 'prop-types';

const Space = (props) => {
    return (
        <div className="empty-space" style={{height: props.height}}></div>
    );
}

Space.propTypes = {
    height: PropTypes.number
};

export default Space;
