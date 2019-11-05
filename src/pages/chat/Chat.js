import React from 'react';

import './Chat.scss';
import Columns from '../../components/grid/Columns';
import Widget from '../../components/widgets/Widget';
import Row from '../../components/grid/Row';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-47747443-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class Chat extends React.Component {
    render() {
        return (
            <div className="chat">
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

export default Chat;
