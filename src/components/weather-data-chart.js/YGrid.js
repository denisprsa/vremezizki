import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class YGrid extends React.Component {
    anchorRef = React.createRef();

    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    }

    update() {
        const axis = d3
            .axisRight(this.props.metadata.yScale)
            .tickSizeOuter(0)
            .tickSizeInner(this.props.metadata.plotWidth);

        const node = this.anchorRef.current;

        if (node) {
            d3.select(node)
                .classed('yGrid', true)
                .call(axis);
        }
    }

    render() {
        const transform = this.props.transform || '';
        return <g transform={transform} ref={this.anchorRef}/>
    }
}

YGrid.propTypes = {
    metadata: PropTypes.object,
    transform: PropTypes.string
}

export default YGrid;
