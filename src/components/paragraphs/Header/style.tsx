import React from 'react';
import { animated as a, useSpring } from 'react-spring';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

import { themeState } from 'global-state';

import C from 'theme-constants';

export const HeaderHolder = styled(a.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  z-index: 10;
  width: 100%;
  height: 66px;
  transition: background 0.5s !important;
  background: ${(props: { theme: themeState }) => C.contBack(props.theme)} !important;
`;

export const NavItems = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex-grow: 11;
  align-items: center;
  justify-content: center;
`;
export const AccountButtons = styled(a.div)`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  z-index: 11;
  align-items: center;
`;

const Toggler = styled(IconButton)`
  z-index: 11;
  position: absolute !important;
  transition: top 0.5s;
  left: 12px;
  top: 9px;
  @media (max-width: 624px) {
    top: ${(props: { headerisopen: string }) =>
      props.headerisopen === 'true' ? '131px' : '9px'};
  }
`;
const AnimArrow = styled(a(KeyboardArrowUp))`
  transition: color 0.5s !important;
  color: ${(props: { theme: themeState }) => C.text(props.theme)} !important;
`;
type toggleArrowProps = {
  setHeaderIsOpen: () => void;
  headerIsOpen: boolean;
  theme: themeState;
};
export const ToggleArrow = (props: toggleArrowProps) => {
  const { headerIsOpen, setHeaderIsOpen, theme } = props;
  const animStyles = useSpring({
    transform: headerIsOpen ? `rotateZ(0deg)` : `rotateZ(180deg)`,
    from: {
      transform: headerIsOpen ? `rotateZ(0deg)` : `rotateZ(180deg)`
    }
  });
  return (
    <Toggler
      onClick={setHeaderIsOpen}
      headerisopen={headerIsOpen.toString()}
      aria-expanded={headerIsOpen}
      aria-label='nav-toggle'>
      <AnimArrow theme={theme} style={animStyles} />
    </Toggler>
  );
};
type navItemsProps = {
  active: number;
  onClick: () => void;
  key: string;
};
const temp = a(Typography);
export const NavItem = styled(temp)`
  color: ${C.prim(0)};
  background: black;
  margin: 3px !important;
  padding: 2px !important;
  padding-left: 7px !important;
  padding-right: 7px !important;
  border-radius: ${C.borderRadius};
  border: 2px solid ${C.acc(0)};
  filter: ${(props: navItemsProps) =>
    props.active ? 'grayscale(0%)' : 'grayscale(100%)'};
  cursor: ${(props: navItemsProps) => (props.active ? 'default' : 'pointer')};
  transition: filter 0.25s;
  user-select: none;
  &:hover {
    filter: grayscale(50%);
    text-decoration: none;
  }
`;
