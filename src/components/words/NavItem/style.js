import styled from 'styled-components';

import { themeSelect } from 'theme';

const [link,linkHover,linkActive] = themeSelect(
  ['getLinkColor','getLinkHover','getLinkActive']
);

export const StyledNavItem = styled.div`
  .link{
   color:${props => (props.active) ? linkActive : link};
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
    color:${props => (props.active) ? null : linkHover};
    text-decoration:none;
  }
`;
