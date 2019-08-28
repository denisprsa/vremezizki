import React from 'react';
import PropTypes from 'prop-types';

class DataCircles extends React.Component {
    renderCircle(coords) {
        let className = this.props.className || '';

        return (
            <circle
                className={className}
                cx={coords.x}
                cy={coords.y}
                r={2}
                fill={this.props.fillColor}
                key={Math.random() * 1}
            />
        );
    }

    render() {
        return (
            <g> { this.props.data.map(this.renderCircle.bind(this)) } </g>
        );
    }
}

DataCircles.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array,
    xScale: PropTypes.func,
    yScale: PropTypes.func,
    fillColor: PropTypes.string
};

export default DataCircles;
