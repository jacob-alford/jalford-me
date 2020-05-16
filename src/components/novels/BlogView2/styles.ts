import styled from 'styled-components';
import { animated as a } from 'react-spring';
import Container from '@material-ui/core/Container';
import C from 'theme-constants';
import { themeState } from 'global-state';

const AnimContainer = a(Container);

export const ViewContainer = styled(AnimContainer)`
  background: ${(props: { theme: themeState }) => C.contBack(props.theme)} !important;
  color: ${(props: { theme: themeState }) => C.text(props.theme)} !important;
  transition: background 0.5s, color 0.5s;
  padding: ${C.spacing(2)} 0px ${C.spacing(2)} 0px;
  hr {
    width: 100%;
    height: 1px;
    transition: background 0.5s;
    background: ${(props: { theme: themeState }) => C.div(props.theme)} !important;
    margin: ${C.spacing(0)} 0px ${C.spacing(0)} 0px !important;
  }
  p {
    font-family: Georgia, Cambria, 'Times New Roman', Times, serif;
  }
`;
