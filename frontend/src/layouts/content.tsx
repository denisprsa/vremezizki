
import React from 'react';

import './content.scss';

interface NavigationItemProps {
    navigationItemStyle?: React.CSSProperties;
    children: any;
}

export const Content = (props: NavigationItemProps) => {
    const { navigationItemStyle, children } = props;

    return (
        <div className="content-wrapper" style={{...navigationItemStyle}}>
            {children}
        </div>
    );
};
