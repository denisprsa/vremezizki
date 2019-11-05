
import React from 'react';
import Row from '../../components/grid/Row';
import SVG from 'react-inlinesvg';
import Space from '../../components/widgets/Space';
import PropTypes from 'prop-types';

import FooterLogo from './../../assets/footer/weather-station-footer-logo.svg';

import './Footer.scss';

const Footer = () => {
    let year = new Date().getFullYear();

    return (
        <div className="weather-station-footer">
            <Row>
                <Space height={30} />
                <div>
                    <div className="footer-upper-wrapper">
                        <div className="footer-logo">
                            <div> <SVG src={FooterLogo}/> </div>
                            <div> Vremenska postaja Žižki </div>
                        </div>
                    </div>
                    <div className="footer-separator"></div>
                    <div className="footer-lower-wrapper">
                        <div className="footer-lower-left-wrapper">
                            <span>© {year} Denis Prša</span>
                        </div>
                        <div className="footer-lower-right-wrapper">
                            <span>Podatke meri vremenska postaja Davis Vantage Pro 2</span>
                        </div>
                    </div>
                </div>
                <Space height={30} />
            </Row>
        </div>
    );
}

Footer.propTypes = {
    image: PropTypes.string
};

export default Footer;
