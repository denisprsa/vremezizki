import React from 'react';

import './Map.scss';
import Row from '../../components/grid/Row';
import Columns from '../../components/grid/Columns';
import Widget from '../../components/widgets/Widget';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-47747443-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class Map extends React.Component {
    render() {
        return (
            <div className="map">
                <Row>
                    <Columns>
                        <Widget>
                            V izdelavi
                        </Widget>
                    </Columns>
                </Row>
            </div>
        );
    }
}

export default Map;
