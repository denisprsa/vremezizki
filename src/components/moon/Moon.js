import React, { Component } from 'react';
import SVG from 'react-inlinesvg';
import GetMonthName from '../../helpers/MonthNames';

import { MoonIllumination, PhaseHunt } from '../../helpers/MoonPhases';
import GlideSlider from '../glide-slider/GlideSlider';

// New moon
import MoonNewMoon from '../../assets/moon/moon-new-moon.svg';

// Wanning Crescent
import MoonWanCre5 from '../../assets/moon/moon-waning-crescent-5-p.svg';
import MoonWanCre10 from '../../assets/moon/moon-waning-crescent-10-p.svg';
import MoonWanCre15 from '../../assets/moon/moon-waning-crescent-15-p.svg';
import MoonWanCre20 from '../../assets/moon/moon-waning-crescent-20-p.svg';
import MoonWanCre25 from '../../assets/moon/moon-waning-crescent-25-p.svg';
import MoonWanCre30 from '../../assets/moon/moon-waning-crescent-30-p.svg';
import MoonWanCre35 from '../../assets/moon/moon-waning-crescent-35-p.svg';
import MoonWanCre40 from '../../assets/moon/moon-waning-crescent-40-p.svg';
import MoonWanCre45 from '../../assets/moon/moon-waning-crescent-45-p.svg';

import MoonFirstQuarter from '../../assets/moon/moon-first-quarter.svg';

// Waxing Gibbous
import MoonWaxGib55 from '../../assets/moon/moon-waxing-gibbous-55-p.svg';
import MoonWaxGib60 from '../../assets/moon/moon-waxing-gibbous-60-p.svg';
import MoonWaxGib65 from '../../assets/moon/moon-waxing-gibbous-65-p.svg';
import MoonWaxGib70 from '../../assets/moon/moon-waxing-gibbous-70-p.svg';
import MoonWaxGib75 from '../../assets/moon/moon-waxing-gibbous-75-p.svg';
import MoonWaxGib80 from '../../assets/moon/moon-waxing-gibbous-80-p.svg';
import MoonWaxGib85 from '../../assets/moon/moon-waxing-gibbous-85-p.svg';
import MoonWaxGib90 from '../../assets/moon/moon-waxing-gibbous-90-p.svg';
import MoonWaxGib95 from '../../assets/moon/moon-waxing-gibbous-95-p.svg';

import MoonFullMoon from '../../assets/moon/moon-full-moon.svg';

// Wanning Gibbous
import MoonWanGib95 from '../../assets/moon/moon-waning-gibbous-95-p.svg';
import MoonWanGib90 from '../../assets/moon/moon-waning-gibbous-90-p.svg';
import MoonWanGib85 from '../../assets/moon/moon-waning-gibbous-85-p.svg';
import MoonWanGib80 from '../../assets/moon/moon-waning-gibbous-80-p.svg';
import MoonWanGib75 from '../../assets/moon/moon-waning-gibbous-75-p.svg';
import MoonWanGib70 from '../../assets/moon/moon-waning-gibbous-70-p.svg';
import MoonWanGib65 from '../../assets/moon/moon-waning-gibbous-65-p.svg';
import MoonWanGib60 from '../../assets/moon/moon-waning-gibbous-60-p.svg';
import MoonWanGib55 from '../../assets/moon/moon-waning-gibbous-55-p.svg';

import MoonLastQuarter from '../../assets/moon/moon-last-quarter.svg';

// Waxing Crescent
import MoonWaxCre5 from '../../assets/moon/moon-waxing-crescent-5-p.svg';
import MoonWaxCre10 from '../../assets/moon/moon-waxing-crescent-10-p.svg';
import MoonWaxCre15 from '../../assets/moon/moon-waxing-crescent-15-p.svg';
import MoonWaxCre20 from '../../assets/moon/moon-waxing-crescent-20-p.svg';
import MoonWaxCre25 from '../../assets/moon/moon-waxing-crescent-25-p.svg';
import MoonWaxCre30 from '../../assets/moon/moon-waxing-crescent-30-p.svg';
import MoonWaxCre35 from '../../assets/moon/moon-waxing-crescent-35-p.svg';
import MoonWaxCre40 from '../../assets/moon/moon-waxing-crescent-40-p.svg';
import MoonWaxCre45 from '../../assets/moon/moon-waxing-crescent-45-p.svg';

import './Moon.scss';

export default class Moon extends Component {
    gliderRef = React.createRef();
    prevWidth = window.innerWidth;

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions.bind(this));
    }

    updateDimensions() {
        if (this.gliderRef && this.gliderRef.current && this.prevWidth !== window.innerWidth) {
            let startIndex = this.getStartAtSlider();
            this.gliderRef.current.setIndex(startIndex);
            this.prevWidth = window.innerWidth;
        }
    }

    getStartAtSlider() {
        let sliderPosition = this.getSliderPosition();

        if (window.innerWidth <= 700) {
            return sliderPosition + 1;
        }

        if (window.innerWidth <= 1219) {
            return sliderPosition;
        } 
        
        return sliderPosition - 1;
    }

    render() {
        let sliderPosition = this.getSliderPosition();

        let sliderOptions = {
            startAt: this.getStartAtSlider(),
            perView: 7,
            type: 'slider',
            gap: 10,
            bound: true,
            hoverpause: true,
            breakpoints: {
                700: {
                    perView: 3
                },
                1219: {
                    perView: 5
                },
                10000: {
                    perView: 7
                }
            }
        };

        return (
            <div className="moon-slider-wrapper">
                <GlideSlider ref={this.gliderRef} options={sliderOptions} showNavigation={true}>
                    { this.createMoonItems(sliderPosition) }
                </GlideSlider>
            </div>
        );
    }

    setMoonObject(icon, name) {
        return {
            icon: icon,
            name: name
        }
    }

    getMoonIcon(fraction, angle, phase, typePhase) {
        // New Moon
        if (typePhase === 'newMoon') {
            return this.setMoonObject(MoonNewMoon, 'mlaj');
        }

        // First Quarter
        if (typePhase === 'firstQuarter') {
            return this.setMoonObject(MoonFirstQuarter, 'prvi krajec');
        }

        // Full Moon
        if (typePhase === 'fullMoon') {
            return this.setMoonObject(MoonFullMoon, 'ščip');
        }

        // Last Quarter
        if (typePhase === 'lastQuarter') {
            return this.setMoonObject(MoonLastQuarter, 'zadnji krajec');
        }

        // Waxing Crescent
        if (phase > 0 && phase <= 0.25) {
            let luna = 'rastoči srp';
            if (fraction <= 0.075) {
                return this.setMoonObject(MoonWaxCre5, luna);
            }
            if (fraction > 0.075 && fraction <= 0.125) {
                return this.setMoonObject(MoonWaxCre10, luna);
            }
            if (fraction > 0.125 && fraction <= 0.175) {
                return this.setMoonObject(MoonWaxCre15, luna);
            }
            if (fraction > 0.175 && fraction <= 0.225) {
                return this.setMoonObject(MoonWaxCre20, luna);
            }
            if (fraction > 0.225 && fraction <= 0.275) {
                return this.setMoonObject(MoonWaxCre25, luna);
            }
            if (fraction > 0.275 && fraction <= 0.325) {
                return this.setMoonObject(MoonWaxCre30, luna);
            }
            if (fraction > 0.325 && fraction <= 0.375) {
                return this.setMoonObject(MoonWaxCre35, luna);
            }
            if (fraction > 0.375 && fraction <= 0.425) {
                return this.setMoonObject(MoonWaxCre40, luna);
            }
            return this.setMoonObject(MoonWaxCre45, luna);
        }

        // Waxing Gibbous
        if ((phase > 0.25 && phase <=0.50)) {
            let luna = 'naraščajoča luna';

            if (fraction <= 0.575) {
                return this.setMoonObject(MoonWaxGib55, luna);
            }
            if (fraction > 0.575 && fraction <= 0.625) {
                return this.setMoonObject(MoonWaxGib60, luna);
            }
            if (fraction > 0.625 && fraction <= 0.675) {
                return this.setMoonObject(MoonWaxGib65, luna);
            }
            if (fraction > 0.675 && fraction <= 0.725) {
                return this.setMoonObject(MoonWaxGib70, luna);
            }
            if (fraction > 0.725 && fraction <= 0.775) {
                return this.setMoonObject(MoonWaxGib75, luna);
            }
            if (fraction > 0.775 && fraction <= 0.825) {
                return this.setMoonObject(MoonWaxGib80, luna);
            }
            if (fraction > 0.825 && fraction <= 0.875) {
                return this.setMoonObject(MoonWaxGib85, luna);
            }
            if (fraction > 0.875 && fraction <= 0.925) {
                return this.setMoonObject(MoonWaxGib90, luna);
            }
            return this.setMoonObject(MoonWaxGib95, luna);
        }

        // Waning Gibbous
        if ((phase > 0.50 && phase <=0.75)) {
            let luna = 'upadajoča luna';

            if (fraction > 0.925) {
                return this.setMoonObject(MoonWanGib95, luna);
            }
            if (fraction <= 0.925 && fraction > 0.875) {
                return this.setMoonObject(MoonWanGib90, luna);
            }
            if (fraction <= 0.875 && fraction > 0.825) {
                return this.setMoonObject(MoonWanGib85, luna);
            }
            if (fraction <= 0.825 && fraction > 0.775) {
                return this.setMoonObject(MoonWanGib80, luna);
            }
            if (fraction <= 0.775 && fraction > 0.725) {
                return this.setMoonObject(MoonWanGib75, luna);
            }
            if (fraction <= 0.725 && fraction > 0.675) {
                return this.setMoonObject(MoonWanGib70, luna);
            }
            if (fraction <= 0.675 && fraction > 0.625) {
                return this.setMoonObject(MoonWanGib65, luna);
            }
            if (fraction <= 0.625 && fraction > 0.575) {
                return this.setMoonObject(MoonWanGib60, luna);
            }
            return this.setMoonObject(MoonWanGib55, luna);
        }

        let luna = 'upadajoči srp';
        // Waning Crescent
        if (fraction > 0.425) {
            return this.setMoonObject(MoonWanCre45, luna);
        }
        if (fraction <= 0.425 && fraction > 0.375) {
            return this.setMoonObject(MoonWanCre40, luna);
        }
        if (fraction <= 0.375 && fraction > 0.325) {
            return this.setMoonObject(MoonWanCre35, luna);
        }
        if (fraction <= 0.325 && fraction > 0.275) {
            return this.setMoonObject(MoonWanCre30, luna);
        }
        if (fraction <= 0.275 && fraction > 0.225) {
            return this.setMoonObject(MoonWanCre25, luna);
        }
        if (fraction <= 0.225 && fraction > 0.175) {
            return this.setMoonObject(MoonWanCre20, luna);
        }
        if (fraction <= 0.175 && fraction > 0.125) {
            return this.setMoonObject(MoonWanCre15, luna);
        }
        if (fraction <= 0.125 && fraction > 0.075) {
            return this.setMoonObject(MoonWanCre10, luna);
        }
        return this.setMoonObject(MoonWanCre5, luna);
    }

    getPhase(date, phases) {
        for (let phase of phases) {
            if (phase.date.getDate() === date.getDate() && phase.date.getMonth() === date.getMonth()) {
                return phase.type;
            }
        }
    }

    createMoonItems(active) {
        let dates = [];

        for (let i = -15; i <= 15; i++) {
            let date = new Date();
            date.setDate(date.getDate() + i);
            date.setHours(22);
            date.setMinutes(0);
            dates.push(date);
        }

        return dates.map((val, index) => {
            let moonIllumination = MoonIllumination(val);
            let moonClass = '';
            let positionIndex = index - 2;
            let dateName = val.getDate() + ' ' + GetMonthName(val.getMonth());
            let phases = PhaseHunt(val);
            let moonIcon = this.getMoonIcon(moonIllumination.fraction, moonIllumination.angle, moonIllumination.phase, this.getPhase(val, phases));

            if (val.getDate() === new Date().getDate() && val.getMonth() === new Date().getMonth()) {
                dateName = 'danes';
            }

            if (active === positionIndex) {
                moonClass = 'moon-first'
            }

            if (active === positionIndex - 1 || active === positionIndex + 1) {
                moonClass = 'moon-second'
            }

            if (active === positionIndex - 2 || active === positionIndex + 2) {
                moonClass = 'moon-third'
            }

            return (
                <div key={index} className={`astronomy-moon-slider-item-wrapper ${moonClass}`}>
                    <div className="astronomy-moon-slider-item-icon-wrapper">
                        <div className="astronomy-moon-slider-item-icon">
                            <SVG src={moonIcon.icon} />
                        </div>
                    </div>
                    <div className="astronomy-moon-day-name">
                        { dateName }
                    </div>
                    <div className="astronomy-moon-illumination">
                        Svetlost { Math.round(moonIllumination.fraction * 100) } %
                    </div>
                    <div className="astronomy-moon-illumination">
                        { moonIcon.name }
                    </div>
                </div>
            );
        });
    }

    getSliderPosition() {
        return this.state && this.state.sliderPositionStep ? this.state.sliderPositionStep : 13;
    }
}
