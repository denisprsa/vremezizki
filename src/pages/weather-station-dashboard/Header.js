
import React from 'react';
import PropTypes from 'prop-types';

import './Header.scss';
import Row from '../../components/grid/Row';

const Header = (props) => {
    return (
        <div className="weather-station-header">
            <Row>
                <div className="weather-station-header-wrapper">
                    <div className="weather-station-header-info">
                        Vremenska postaja Žižki
                    </div>
                    <div className="weather-station-header-image" style={{ backgroundImage: `url(${props.image})` }}></div>
                </div>
            </Row>
        </div>
    );
}

Header.propTypes = {
    image: PropTypes.string
};

export default Header;
