import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { themeState } from 'global-state';

export const UserMenu = styled(Menu)``;

export const UserMenuItem = styled(MenuItem)``;

export const CircleButton = styled(IconButton)`
  z-index: 11;
  transition: color 0.5s;
  padding: 0px 5px 0px 5px;
  color: ${(props: { mode: themeState }) =>
    props.mode === themeState.light
      ? 'rgba(0,0,0,1)'
      : 'rgba(255,255,255,.85)'} !important;
`;
export const AccountIcon = styled(AccountCircleIcon)`
  transition: color 0.5s;
`;
