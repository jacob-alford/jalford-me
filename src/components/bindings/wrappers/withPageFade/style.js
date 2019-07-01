import styled from 'styled-components';
// import { constants as c } from '../../../theme';

export const StyledPage = styled.div`
  .page-enter{
    opacity:0;
    transform: translateY(-1%);
  }
  .page-enter-active{
    opacity:1;
    transform: scale(1);
    transition: opacity .5s, transform .5s;
  }
  .page-exit{
    opacity:1;
    transform: scale(1);
  }
  .page-exit-active{
    opacity:0;
    transform: scale(.75);
    transition: opacity .5s, transform .5s;
  }
`;
