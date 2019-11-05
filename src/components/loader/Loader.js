import React from 'react';
import PropTypes from 'prop-types';

import './Loader.scss';

const Loader = (props) => {
    return (
        <div className="loader" style={{height: props.height}}>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    );
}

Loader.propTypes = {
    height: PropTypes.number
};

export default Loader;
