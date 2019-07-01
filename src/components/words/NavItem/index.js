import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@material-ui/core/';

import { StyledNavItem } from './style.js';

export default function NavItem(props){
  const { active , text } = props;
  return (
    <StyledNavItem active={active}>
      <Link className="link" {...props}>
        {text}
      </Link>
    </StyledNavItem>
  );
}

NavItem.propTypes = {
  active:PropTypes.oneOf([1,0]),
  url:PropTypes.string,
  text:PropTypes.string.isRequired
}
