import styled from 'styled-components';
import C from '../constants';

const EnteringValue = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 38px;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
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
