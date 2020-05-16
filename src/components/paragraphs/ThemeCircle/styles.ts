import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import { themeState } from 'global-state';

export const CircleButton = styled(IconButton)`
  z-index: 11;
  padding: 0px 5px 0px 5px;
  transition: color 0.5s background 0.5s !important;
  color: ${(props: { mode: themeState }) =>
    props.mode === themeState.light
      ? 'rgba(0,0,0,1)'
      : 'rgba(255,255,255,.85)'} !important;
`;
