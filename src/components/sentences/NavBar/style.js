import styled from 'styled-components';

export const StyledNavBar = styled.div`
  .navBar{
    width:100vw;
  }
  .mobileNavShown{
    transition: height .25s;
  }
  .mobileNavHidden{
    height:0px;
    transition: height .25s;
  }
`;
