import React from 'react';
import SVG from 'react-inlinesvg';
import PropTypes from 'prop-types';

import './MainMenuItem.scss';

const MainMenuItem = (props) => {
    return (
        <div className="main-menu-item">
            <div className={'main-menu-item-icon'}><SVG src={props.icon}/></div>
        </div>
    );
}

MainMenuItem.propTypes = {
    icon: PropTypes.string
};

export default MainMenuItem;
