import React, { FunctionComponent, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type PropsNavigationItemLink = {
  navigationItemStyle: React.CSSProperties;
  location: string;
  children: ReactNode;
}

export const NavigationItemLink: FunctionComponent<PropsNavigationItemLink> = (props: PropsNavigationItemLink) => {
  const { navigationItemStyle, location, children } = props;
  return (
    <Link style={{...navigationItemStyle}} to={location}>
      <div className="navigation-item-wrapper">
        { children }
      </div>
    </Link>
  );
};


type PropsNavigationItemButton = {
  children: ReactNode;
}

export const NavigationItemButton: FunctionComponent<PropsNavigationItemButton> = (props: PropsNavigationItemButton) => {
  const { children } = props;

  return (
    <div className="navigation-item-wrapper">
      { children }
    </div>
  );
};