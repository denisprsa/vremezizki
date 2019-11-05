import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class Line extends React.Component {
    anchorRef = React.createRef();
    bisectDate = d3.bisector((d) => { return d.data.date; }).left;

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
            .y((d) => d.y)
            .curve(d3.curveMonotoneX);

        const node = this.anchorRef.current;
        
        if (node) {
            this.parent = d3.select(node);
            const current = this.parent.selectAll('.valueLine').data([this.props.plotData]);

            this.parent.selectAll('.focus').remove();
            this.parent.selectAll('.overlay').remove();

            const enter = current
                .enter()
                .append('path')
                .classed('valueLine', true);

            current.merge(enter);

            const svg = d3.select(node).transition();
            svg.select('.valueLine')
                .duration(750)
                .attr('d', path)
                .attr('style', `stroke:${this.props.metadata.colorLine}`)
        }
    }

    getPosition() {
        const xy = d3.mouse(this.anchorRef.current);
        const x0 = this.props.metadata.xScale.invert(d3.mouse(this.anchorRef.current)[0]);
        const i = this.bisectDate(this.props.plotData, x0, 1);
        const d0 = this.props.plotData[i - 1];
        const d1 = this.props.plotData[i];

        if ((!d0 || !d1) && this.props.plotData.length > 1) {
            return this.props.plotData[this.props.plotData.length - 2]
        } else if ((!d0 || !d1) && this.props.plotData.length === 0) {
            return;
        }

        const d1x = d1.x - d0.x;
        const xyx = xy[0] - d0.x;

        let d;
        if (xyx < d1x / 2) {
            d = d0;
        } else {
            d = d1;
        }

        return d;
    }

    formatCurrency(val) {
        return d3.format(',.1f')(val) + ` ${this.props.unit}`;
    }

    render() {
        const transform = this.props.transform || '';
        return <g transform={transform} ref={this.anchorRef}/>
    }
}

Line.propTypes = {
    transform: PropTypes.string,
    unit: PropTypes.string,
    plotData: PropTypes.array,
    metadata: PropTypes.object
};

export default Line;
