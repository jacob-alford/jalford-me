import React, { useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";

import { IconButton, Fade } from '@material-ui/core/';
import { Add , Edit } from '@material-ui/icons/';

export default function BlogBarActions(props){
  const { user , context } = props;
  return (
    <React.Fragment>
      {(user.activeUser.permissions.value >= 8) ? (
        <Fade in={user.loggedIn} timeout={1500}>
          <IconButton color="inherit">
            <Add />
          </IconButton>
        </Fade>
        ) : null}
      {(user.activeUser.permissions.value >= 8 && context==="inPost") ? (
        <Fade in={user.loggedIn} timeout={1500}>
          <IconButton color="inherit">
            <Edit />
          </IconButton>
        </Fade>
        ) : null}
    </React.Fragment>
  );
}
