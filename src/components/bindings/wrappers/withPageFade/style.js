import styled from 'styled-components';
// import { constants as c } from '../../../theme';

export const StyledPage = styled.div`
  .page-enter{
    opacity:0;
    filter: blur(1em);
    transform: translateY(-1%);
  }
  .page-enter-active{
    opacity:1;
    filter: blur(0px);
    transform: scale(1);
    transition: opacity .5s, transform .5s, filter .5s;
  }
  .page-exit{
    opacity:1;
    filter: blur(0px);
    transform: scale(1);
  }
  .page-exit-active{
    opacity:0;
    filter: blur(1em);
    transform: scale(.75);
    transition: opacity .5s, transform .5s, filter .5s;
  }
`;
