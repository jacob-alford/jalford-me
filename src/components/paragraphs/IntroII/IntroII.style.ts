import styled from 'styled-components';
import { animated as a } from 'react-spring';
import C from 'theme-constants';

export const Splash = styled.canvas`
  position: absolute;
  width: 100%;
  height: 66vh;
  z-index: -1;
`;

export const Screen = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 66vh;
  width: 100%;
  overflow: hidden;
`;

export const Var = styled.span`
  color: ${C.prim(3)};
`;
export const Type = styled.span`
  color: #fede5d;
`;
export const TypeClass = styled.span`
  color: #f97e72;
`;
export const String = styled.span`
  color: #ff8b39;
`;

export const Haskell = styled.pre`
  color: #bbbbbb;
  @media (min-width: 1000px) {
    font-size: 2rem;
  }
  @media (max-width: 999px) {
    font-size: 1.5rem;
  }
  @media (max-width: 700px) {
    font-size: 1rem;
  }
  @media (max-width: 500px) {
    font-size: 0.69rem;
  }
`;
export const Code = styled.code``;
export const CodeP = styled(a.p)``;
