import React, { createRef, useLayoutEffect, FunctionComponent, ReactNode } from 'react';
import Box from '@material-ui/core/Box';

import './mobile.scss';

type Props = {
  childMarginLeft: number;
  positionCenter?: boolean;
};

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
      const scrollWidth = scrollRef.current.scrollWidth;
      const clientWidth = scrollRef.current.clientWidth;
      console.log('scrollWidth', scrollWidth, 'clientWidth', clientWidth, 'scrollLeft', scrollRef.current.scrollLeft);

      scrollRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
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
