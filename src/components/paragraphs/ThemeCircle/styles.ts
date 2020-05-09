import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import { themeState } from 'global-state';

export const CircleButton = styled(Fab)`
  position: fixed !important;
  top: calc(100vh - 180px);
  left: 44px;
  z-index: 11;
  transition: color 0.5s background 0.5s !important;
  background: ${(props: { mode: themeState }) =>
    props.mode === themeState.light
      ? 'rgba(255,255,255,.69)'
      : 'rgba(0,0,0,.54)'} !important;
  color: ${(props: { mode: themeState }) =>
    props.mode === themeState.light
      ? 'rgba(0,0,0,1)'
      : 'rgba(255,255,255,.85)'} !important;
  &:hover {
    background: ${(props: { mode: themeState }) =>
      props.mode === themeState.light
        ? 'rgba(255,255,255,.85)'
        : 'rgba(0,0,0,.44)'} !important;
  }
`;
