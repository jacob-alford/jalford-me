import styled from 'styled-components';

import { constants as c } from '../../../theme';

export const StyledNavItem = styled.div`
  .link{
   color:${props => (props.active) ? c.linkActive : c.link};
   cursor:${props => (props.active) ? "default" : "pointer"};
   -webkit-transition: color .15s;
   transition: color .25s;
  }
  .link:hover{
    color:${props => (props.active) ? null : c.linkActive};
    text-decoration:none;
  }
`;
