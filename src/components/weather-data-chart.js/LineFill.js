import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class LineFill extends React.Component {
    anchorRef = React.createRef();

    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    }

    update() {
        const path = d3
            .area()
            .x((d) => d.x)
            .y0(this.props.metadata.plotHeight)
            .y1((d) => d.y)
            .curve(d3.curveMonotoneX);

        const node = this.anchorRef.current;

        if (node) {
            const parent = d3.select(node);
            const current = parent.selectAll('.valueLineFill').data([this.props.plotData]);

            const enter = current
                .enter()
                .append('path')
                .classed('valueLineFill', true)
                .style('fill', `url(#${this.props.defName})`);

            current.merge(enter);

            const svg = d3.select(node).transition();
            svg.select('.valueLineFill')
                .duration(750)
                .attr('d', path);
        }
    }

    render() {
        const transform = this.props.transform || '';
        return <g transform={transform} ref={this.anchorRef}/>
    }
}

LineFill.propTypes = {
    metadata: PropTypes.object,
    transform: PropTypes.string,
    plotData: PropTypes.array,
    defName: PropTypes.string
};

export default LineFill;
