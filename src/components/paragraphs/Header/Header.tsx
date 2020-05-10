import React from 'react';
import { useLocation } from 'react-router';
import { useSpring } from 'react-spring';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { navItems } from 'config';
import { getActiveNavItem } from 'functions';
import useRedirect from 'components/bindings/utilityHooks/useRedirect';
import UserCircle from 'components/paragraphs/UserCircle/UserCircle';
import ThemeCircle from 'components/paragraphs/ThemeCircle/ThemeCircle';
import { useStoreState, useStoreActions, HEAD_TOG } from 'global-state';
import { NavItems, NavItem, ToggleArrow, HeaderHolder, AccountButtons } from './style';

const Header = () => {
  const headerIsOpen = useStoreState(store => store.headerIsOpen);
  const shouldWrap = useMediaQuery('(max-width:750px)');
  const theme = useStoreState(store => store.theme);
  const setHeaderIsOpen = useStoreActions({ type: HEAD_TOG, payload: null });
  const location = useLocation();
  const redirect = useRedirect() as (link: string) => () => void;
  const headerStyles = useSpring({
    height: headerIsOpen ? (shouldWrap ? 136 : 66) : 0,
    from: {
      height: headerIsOpen ? (shouldWrap ? 136 : 66) : 0
    },
    config: {
      tension: 169,
      friction: 42
    }
  });
  const navItemStyles = useSpring({
    transform: headerIsOpen
      ? 'translate3d(0, 0px, 0)'
      : shouldWrap
      ? 'translate3d(0, -136px, 0)'
      : 'translate3d(0, -66px, 0)',
    from: {
      transform: headerIsOpen
        ? 'translate3d(0, 0px, 0)'
        : shouldWrap
        ? 'translate3d(0, -136px, 0)'
        : 'translate3d(0, -66px, 0)'
    },
    config: {
      tension: 169,
      friction: 42,
      mass: 10
    }
  });
  return (
    <>
      <ToggleArrow
        theme={theme}
        headerIsOpen={headerIsOpen}
        setHeaderIsOpen={setHeaderIsOpen}
      />
      <HeaderHolder theme={theme} style={headerStyles}>
        <NavItems>
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
        <AccountButtons style={navItemStyles}>
          <ThemeCircle />
          <UserCircle />
        </AccountButtons>
      </HeaderHolder>
    </>
  );
};

export default Header;
