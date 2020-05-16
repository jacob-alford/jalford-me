import styled from 'styled-components';
import { themeState } from 'global-state';
import C from 'theme-constants';

export const RPNContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: max-content;
  min-height: 100vh;
  background: ${(props: { theme: themeState }) => C.contBackAlt(props.theme)};
  transition: background 0.5s;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;
