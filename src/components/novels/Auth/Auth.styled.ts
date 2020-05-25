import styled from 'styled-components';
import { themeState } from 'global-state';
import C from 'theme-constants';

export const AuthContainer = styled.div`
  display: flex;
  flex-flow: row wrap-reverse;
  justify-content: center;
  align-items: flex-end;
  background: ${(props: { theme: themeState }) => C.contBackAlt(props.theme)};
  transition: background 0.5s;
  padding: ${C.spacing(1)};
`;
