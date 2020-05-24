import styled from 'styled-components';
import C from 'theme-constants';

export const ModalPaper = styled.div`
  position: absolute;
  left: calc(100vw - calc(${C.spacing(0)} + 238.85px));
  top: ${C.spacing(0)};
  padding: 0px;
  margin: 0px;
  height: 570.76px;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  width: 238.85px;
`;
