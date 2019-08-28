import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import DataCircles from './DataCircles';

class ScatterPlot extends React.Component {
    constructor(props) {
        super(props);
        this.anchorRef = React.createRef();
        this.bisectDate = d3.bisector((d) => { return d.data.date; }).left;
    }

    getPosition() {
        const xy = d3.mouse(this.anchorRef.current);
        const x0 = this.props.metadata.xScale.invert(d3.mouse(this.anchorRef.current)[0]);
        const i = this.bisectDate(this.props.plotData, x0, 1);
        const d0 = this.props.plotData[i - 1];
        const d1 = this.props.plotData[i];

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

    render() {
        return (
            <g ref={this.anchorRef}>
                <DataCircles
                    fillColor={this.props.metadata.colorLine}
                    xScale={this.props.metadata.xScale}
                    yScale={this.props.metadata.yScale}
                    data={this.props.plotData}/>
            </g>
        );
    }
}

ScatterPlot.propTypes = {
    metadata: PropTypes.object,
    plotData: PropTypes.array
}

export default ScatterPlot;
