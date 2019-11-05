import React, { Component } from 'react';
import Glide from '@glidejs/glide';
import SVG from 'react-inlinesvg';
import PropTypes from 'prop-types';
import { Breakpoints } from '@glidejs/glide/dist/glide.modular.esm';

import LeftArrow from '../../assets/glide-slider/left-arrow.svg';
import RightArrow from '../../assets/glide-slider/right-arrow.svg';

import './GlideSlider.scss';

class GlideSlider extends Component {
    constructor(props) {
        super(props);
        this.state = { id: undefined, disableTouchAction: false };
        this.updated = 0;
    }

    componentDidMount = () => {
        // Generated random id
        this.setState({ id: `glide-${Math.ceil(Math.random() * 1000)}` }, this.initializeGlider)
    }

    componentDidUpdate() {
    }

    updateGlider() {
        let options = this.props.options;
        
        if (this.slider) {
            options.startAt = this.slider.index;
        }

        this.slider = new Glide(`#${this.state.id}`, options);
        this.slider.mount({ Breakpoints });
        // this.setEvents();
    }

    initializeGlider() {
        this.slider = new Glide(`#${this.state.id}`, this.props.options);
        this.slider.mount({ Breakpoints });
        // this.setEvents();
    }

    setEvents() {
        this.slider.on('swipe.start', () => {
            this.setState({ disableTouchAction: true });
        });
        this.slider.on('swipe.end', () => {
            this.setState({ disableTouchAction: false });
        });
    }

    setIndex(index) {
        if (this.slider) {
            this.slider.update({ startAt: index });
        }
    }

    go(pattern) {
        if (this.slider) {
            this.slider.go(pattern);
        }
    }

    render() {
        let navigation;

        if (this.props.showNavigation) {
            navigation = (
                <div className="glide__arrows" data-glide-el="controls">
                    <div className="glide__arrow glide__arrow--left" data-glide-dir="<"><SVG src={LeftArrow}/></div>
                    <div className="glide__arrow glide__arrow--right" data-glide-dir=">"><SVG src={RightArrow}/></div>
                </div>
            );
        }

        if (this.state && this.state.id) {

            let slides;

            if (this.props.children && this.props.children.length) {
                slides = this.props.children.map((slide, index) => {
                    return React.cloneElement(slide, {
                        key: index,
                        className: `${slide.props.className ? slide.props.className : ''} glide__slide`,
                    });
                });
            } else {
                slides = React.cloneElement(this.props.children, {
                    key: 0,
                    className: `${this.props.children.props.className} glide__slide`,
                });
            }

            let styles = { overflowX: 'hidden', userSelect: 'none', maxWidth: '100vw' };

            if (this.state.disableTouchAction) {
                styles.touchAction = 'none';
            }

            return <div id={this.state.id} style={styles}>
                <div className="glide__track" data-glide-el="track">
                    <div className="glide__slides" style={{ display: 'flex' }}>
                        { slides }
                    </div>
                </div>

                { navigation }
            </div>;
        } else {
            return <div></div>
        }
    }
}

GlideSlider.propTypes = {
    children: PropTypes.any,
    showNavigation: PropTypes.bool,
    options: PropTypes.object
};

export default GlideSlider;
