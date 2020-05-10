import React from 'react';
import { animated as a, useSpring } from 'react-spring';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

import { themeSelect } from 'theme';

const [cardPadding, borderRadius] = themeSelect(['getCardPadding', 'getBorderRadius']);

export const NavItems = styled(a.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background: white;
  z-index: 1;
  width: 100%;
  height: 66px;
`;

const Toggler = styled(IconButton)`
  z-index: 1;
  position: absolute !important;
  left: 12px;
  top: 9px;
`;
const AnimArrow = styled(a(KeyboardArrowUp))`
  color: black;
`;
type toggleArrowProps = {
  setHeaderIsOpen: () => void;
  headerIsOpen: boolean;
};
export const ToggleArrow = (props: toggleArrowProps) => {
  const { headerIsOpen, setHeaderIsOpen } = props;
  const animStyles = useSpring({
    transform: headerIsOpen ? `rotateZ(0deg)` : `rotateZ(180deg)`,
    from: {
      transform: headerIsOpen ? `rotateZ(0deg)` : `rotateZ(180deg)`
    }
  });
  return (
    <Toggler
      onClick={setHeaderIsOpen}
      aria-expanded={headerIsOpen}
      aria-label='nav-toggle'>
      <AnimArrow style={animStyles} />
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
  color: #14b2c7;
  background: black;
  margin: 3px !important;
  padding: 2px !important;
  padding-left: 7px !important;
  padding-right: 7px !important;
  border-radius: ${borderRadius};
  border: 2px solid #14b2c7;
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
