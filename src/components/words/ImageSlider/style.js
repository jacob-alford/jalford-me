import styled from 'styled-components';

export const StyledImageSlider = styled.div`
  .imageContainer{
    position:absolute;
    display:block;
    top:25vh;
  }
  .image{
    margin-top:0px !important;
    width:100vw !important;
    height:auto;
  }
  .hidden{
    opacity:0;
    transition: opacity .5s;
  }
  .visible{
    opacity:1;
    transition: opacity .5s;
  }
`;
