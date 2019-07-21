import React from 'react';

import { IconButton, Fade } from '@material-ui/core/';
import { NoteAdd , Edit } from '@material-ui/icons/';

export default function BlogBarActions(props){
  const { user , context , color } = props;
  return (
    <React.Fragment>
      {(user.activeUser.permissions.value >= 8 && context==="inBlog") ? (
        <Fade in={user.loggedIn} timeout={1500}>
          <IconButton>
            <NoteAdd style={{color:color}}/>
          </IconButton>
        </Fade>
        ) : null}
      {(user.activeUser.permissions.value >= 8 && context==="inPost") ? (
        <Fade in={user.loggedIn} timeout={1500}>
          <IconButton color="inherit">
            <Edit style={{color:color}}/>
          </IconButton>
        </Fade>
        ) : null}
    </React.Fragment>
  );
}
