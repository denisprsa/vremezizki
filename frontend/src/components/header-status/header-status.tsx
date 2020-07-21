import React, { FunctionComponent } from 'react';
import { ReactSVG } from 'react-svg';

import './header-status.scss';

type Props = {
}

export const HeaderStatus: FunctionComponent<Props> = () => {
    return (
        <div className="header-status-wrapper">
            <ReactSVG src="/assets/navigation/weather.svg" />
        </div>
    );
};
