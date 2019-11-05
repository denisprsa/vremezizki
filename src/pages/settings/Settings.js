import React from 'react';

import './Settings.scss';
import Row from '../../components/grid/Row';
import Columns from '../../components/grid/Columns';
import Widget from '../../components/widgets/Widget';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-47747443-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class Settings extends React.Component {
    render() {
        return (
            <div className="settings">
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

export default Settings;
