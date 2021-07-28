import React, { FunctionComponent, ReactNode } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import './carousel.scss';

import DesktopCarousel from './desktop/desktop';
import MobileCarousel from './mobile/mobile';

type Props = {
  marginLeftMobile: number;
  positionCenter?: boolean;
  className?: string;
  children?: ReactNode;
}

const Carousel: FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <BrowserView>
        <DesktopCarousel positionCenter={props.positionCenter}>
          { props.children }
        </DesktopCarousel>
      </BrowserView>
      <MobileView>
        <MobileCarousel childMarginLeft={props.marginLeftMobile} positionCenter={props.positionCenter}>
          { props.children }
        </MobileCarousel>
      </MobileView>
    </>
  );
};

export default Carousel;
