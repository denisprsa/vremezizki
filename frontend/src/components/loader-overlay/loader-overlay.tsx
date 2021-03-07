import React, { FunctionComponent, ReactNode } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './loader-overlay.scss';

type Props = {
    loading: boolean;
    width?: number;
    height?: number;
    children: ReactNode;
}

const LoaderOverlay: FunctionComponent<Props> = (props: Props) => {
    const style: React.CSSProperties = {};
    
    if (props.width !== undefined && !isNaN(props.width)) {
        style.width = `${props.width}px`;
    }
    
    if (props.height !== undefined && !isNaN(props.height)) {
        style.height = `${props.height}px`;
    }

    if (props.loading) {
        return (
            <div className="loader-overlay">
                <div className="loader-overlay__align" style={style}>
                    <CircularProgress />
                </div>
            </div>
        );
    }

    return (
        <>
            { props.children }
        </>
    );
};

export default LoaderOverlay;
