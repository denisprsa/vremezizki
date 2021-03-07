
import React, { FunctionComponent } from 'react';
import './h2-title.scss';

type Props = {
    title: string;
}

const H2Title: FunctionComponent<Props> = (props: Props) => {
    return (
        <div className="current-conditions-items-title">
            <h2>
                {props.title}
            </h2>
        </div>
    );
};

export default H2Title;
