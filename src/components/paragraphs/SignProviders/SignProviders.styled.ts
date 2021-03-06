import styled from 'styled-components';
import { animated as a } from 'react-spring';
import Typography from '@material-ui/core/Typography';
import C from 'theme-constants';
import { themeState } from 'global-state';

export const SignProviderDialogue = styled(a.div)`
  display: flex;
  flex-flow: column;
  padding: ${C.spacing(0)};
  margin: 7px;
  text-align: center;
  width: 226px;
  height: max-content;
  max-height: 100vh;
  justify-content: center;
  align-items: center;
  border: 2px solid #14b2c7;
  background: ${(props: { theme: themeState }) => C.contBack(props.theme)};
  transition: background 0.5s, color 0.5s, border 0.5s;
`;

export const Title = styled(Typography)`
  color: ${(props: { theme: themeState }) => C.text(props.theme)};
  font-weight: 900 !important;
  transition: background 0.5s, color 0.5s;
  margin: 0px !important;
`;

export const Divider = styled.div`
  background: ${(props: { theme: themeState }) => C.div(props.theme)};
  height: 2px;
  width: 100%;
  margin: ${C.spacing(0)} 0px ${C.spacing(0)} 0px !important;
  transition: background 0.5s, color 0.5s;
`;
