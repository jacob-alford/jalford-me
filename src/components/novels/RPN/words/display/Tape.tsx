import styled from 'styled-components';
import { themeState } from 'global-state';
import C from 'theme-constants';

const Tape = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-wrap: nowrap;
  width: 30%;
  padding: 8px;
  border-left: 2px solid ${(props: { theme: themeState }) => C.div(props.theme)};
  transition: border 0.5s;
  overflow: hidden;
`;

export default Tape;
