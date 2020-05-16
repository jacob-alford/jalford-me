import { animated as a } from 'react-spring';
import styled from 'styled-components';

export const Splash = styled(a.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 66vh;
  width: 100%;
  overflow: hidden;
  z-index: -1;
`;

export const Orbital = styled(a.canvas)`
  @media (max-width: 450px) {
    width: 250px;
    height: 250px;
  }
  @media (min-width: 451px) {
    width: 400px;
    height: 400px;
  }
  position: absolute;
  backdrop-filter: saturate(0);
  border-radius: 200px;
  overflow: hidden;
  z-index: -1;
`;
