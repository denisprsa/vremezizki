import React, { createRef, useLayoutEffect, FunctionComponent, ReactNode } from 'react';
import Box from '@material-ui/core/Box';

import './mobile.scss';



interface Props {
    childMarginLeft: number;
    positionCenter?: boolean;
}

const MobileCarousel: FunctionComponent<Props> = (props: Props & { children?: ReactNode }) => {
    const scrollRef = createRef<HTMLUListElement>();
    const children = React.Children.map(props.children, (child, index) => {
        const itemStyle: React.CSSProperties = {};

        if (index === 0) {
            itemStyle.marginLeft = props.childMarginLeft;
        }

        return (<li className="carousel-mobile-item" style={itemStyle}> {child} </li>);
    });

    useLayoutEffect(() => {
        if (props.positionCenter && scrollRef.current) {
            scrollRef.current.scrollLeft += 200;
        }
    }, [props.positionCenter, scrollRef]);

    return (
        <Box>
            <ul className="carousel-mobile" ref={scrollRef}>
                { children }
            </ul>
        </Box>
    );
};

export default MobileCarousel;
