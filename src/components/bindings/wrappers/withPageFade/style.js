import styled from 'styled-components';
// import { constants as c } from '../../../theme';

export const StyledPage = styled.div`
  .page-enter{
    opacity:0;
    filter: blur(1.5em);
    transform: scale(.9);
  }
  .page-enter-active{
    opacity:1;
    filter: blur(0px);
    transform: scale(1);
    transition: opacity .75s, transform .5s, filter .5s;
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
    transition: opacity .75s, transform .5s, filter .5s;
  }
`;
