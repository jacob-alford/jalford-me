import styled from 'styled-components';

import { constants as c } from '../../../theme';

export const StyledNavItem = styled.div`
  .link{
   color:${props => (props.active) ? c.linkActive : c.link};
   cursor:${props => (props.active) ? "default" : "pointer"};
   -webkit-transition: color .15s;
   transition: color .25s;
   -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
  }
  .link:hover{
    color:${props => (props.active) ? null : c.linkActive};
    text-decoration:none;
  }
`;
