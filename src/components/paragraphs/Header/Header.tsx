import React from 'react';
import { useLocation } from 'react-router';
import { useTrail, useSpring } from 'react-spring';

import { navItems } from 'config';
import { getActiveNavItem } from 'functions';
import useRedirect from 'components/bindings/utilityHooks/useRedirect';
import { useStoreState, useStoreActions, HEAD_TOG } from 'global-state';
import { NavItems, NavItem, ToggleArrow } from './style';

const Header = () => {
  const headerIsOpen = useStoreState(store => store.headerIsOpen);
  const setHeaderIsOpen = useStoreActions({ type: HEAD_TOG, payload: null });
  const location = useLocation();
  const redirect = useRedirect() as (link: string) => () => void;
  const headerStyles = useSpring({
    height: headerIsOpen ? 66 : 0,
    from: {
      height: headerIsOpen ? 66 : 0
    },
    config: {
      tension: 420,
      friction: 32
    }
  });
  const navItemStyles = useSpring({
    transform: headerIsOpen ? 'translate3d(0, 0px, 0)' : 'translate3d(0, -66px, 0)',
    from: {
      transform: headerIsOpen ? 'translate3d(0, 0px, 0)' : 'translate3d(0, -66px, 0)'
    },
    config: {
      tension: 420,
      friction: 32
    }
  });
  return (
    <>
      <ToggleArrow headerIsOpen={headerIsOpen} setHeaderIsOpen={setHeaderIsOpen} />
      <NavItems style={headerStyles}>
        {navItems.map((navItem, index) => (
          <NavItem
            active={getActiveNavItem(location.pathname) === index ? 1 : 0}
            onClick={redirect(navItem.url)}
            key={navItem.text}
            style={navItemStyles}>
            {navItem.text}
          </NavItem>
        ))}
      </NavItems>
    </>
  );
};

export default Header;
