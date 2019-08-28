import React from 'react';
import PropTypes from 'prop-types';

class ArcPath extends React.PureComponent {
    static coordinates(halfWidth, radius, startAngle, endAngle) {
        const startAngleDegrees = (Math.PI * startAngle) / 180;
        const x1 = halfWidth + ((halfWidth * radius) * Math.cos(startAngleDegrees));
        const y1 = halfWidth + ((halfWidth * radius) * Math.sin(startAngleDegrees));
        const endAngleDegrees = (Math.PI * endAngle) / 180;
        const x2 = halfWidth + ((halfWidth * radius) * Math.cos(endAngleDegrees));
        const y2 = halfWidth + ((halfWidth * radius) * Math.sin(endAngleDegrees));

        return {x1, y1, x2, y2};
    }

    static arc(width, radius, largeArcFlag, x, y) {
        const z = (width / 2) * radius;

        return `A${z}, ${z} 0 ${largeArcFlag} ${x}, ${y}`;
    }

    static path(activeAngle, startAngle, width, innerRadius, outerRadius, convexEdge) {
        const endAngle = startAngle + activeAngle;
        const largeArcFlagOuter = activeAngle > 180 ? '1 1' : '0 1';
        const largeArcFlagInner = activeAngle > 180 ? '1 0' : '0 0';
        const halfWidth = width / 2;
        const outerCoords = ArcPath.coordinates(halfWidth, outerRadius, startAngle, endAngle);
        const innerCoords = ArcPath.coordinates(halfWidth, innerRadius, startAngle, endAngle);

        const outerArc = ArcPath.arc(width, outerRadius, largeArcFlagOuter, outerCoords.x2, outerCoords.y2);
        const innerArc = ArcPath.arc(width, innerRadius, largeArcFlagInner, innerCoords.x1, innerCoords.y1);

        const startConvex = convexEdge === 'start' || convexEdge === 'both' ? 1 : 0;
        const endConvex = convexEdge === 'end' || convexEdge === 'both' ? 1 : 0;

        return `M${outerCoords.x1},${outerCoords.y1}
                ${outerArc}
                A 1,1, 0,1,${endConvex}, ${innerCoords.x2},${innerCoords.y2}
                ${innerArc}
                A 1,1 0,1,${startConvex}, ${outerCoords.x1},${outerCoords.y1}`;
    }

    render() {
        let {
            className,
            value,
            total,
            angle,
            diameter,
            fill,
            stroke,
            innerRadius,
            outerRadius,
            convexEdge,
            onClick,
            onMouseEnter } = this.props;

        const activeAngle = (Number.isNaN(value / total) || ((total / value) === 1)) ? 359.99 : (value / total) * 360;
        const d = ArcPath.path(activeAngle, angle - 90, diameter, innerRadius, outerRadius, convexEdge);

        return (
            <path
                className={className}
                d={d}
                stroke={stroke}
                fill={fill}
                onClick={onClick}
                onMouseEnter={onMouseEnter}>
            </path>
        );
    }
}

ArcPath.propTypes = {
    className: PropTypes.string,
    value: PropTypes.number,
    total: PropTypes.number,
    angle: PropTypes.number,
    diameter: PropTypes.number,
    fill: PropTypes.string,
    stroke: PropTypes.string,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.number,
    convexEdge: PropTypes.number,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func
}

export default ArcPath;
