import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React, { Component, createRef } from 'react';

class YAxis extends Component {
    anchorRef = createRef();

    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    }

    update() {
        const axis = d3.axisLeft(this.props.metadata.yScale).tickFormat((d) => d);
        const node = this.anchorRef.current;

        if (node) {
            d3.select(node)
                .classed('y-axis', true)
                .transition()
                .call(axis);
        }
    }

    render() {
        const transform = this.props.transform || '';
        return <g transform={transform} ref={this.anchorRef}/>
    }
}

YAxis.propTypes = {
    metadata: PropTypes.object,
    transform: PropTypes.string
};

export default YAxis;
