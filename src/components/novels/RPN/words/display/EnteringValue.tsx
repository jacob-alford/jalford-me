import styled from 'styled-components';
import C from '../constants';
import C2 from 'theme-constants';
import { themeState } from 'global-state';

const EnteringValue = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 38px;
  border-top: 2px solid ${(props: { theme: themeState }) => C2.div(props.theme)};
  border-bottom: 2px solid ${(props: { theme: themeState }) => C2.div(props.theme)};
  transition: border 0.5s;
  color: white;
  height: ${C.h};
  width: 100%;
  background: ${C.green(2)};
  padding: 8px;
  &:after {
    font-size: 38px;
    margin-left: 16px;
    margin-top: -8px;
    content: '←';
  }
`;

export default EnteringValue;
