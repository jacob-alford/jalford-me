import styled from 'styled-components';
import { animated as a } from 'react-spring';
export type homeProps = {
  setHeaderIsOpen: (val: boolean) => void;
};

export const Landscape = styled(a.div)`
  width: 100%;
  height: 66vh;
  z-index: -1;
  position: absolute;
`;

export const House = styled.canvas`
  position: absolute;
  z-index: -1;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;
