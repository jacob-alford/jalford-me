import React from 'react';

import { IconButton, Fade } from '@material-ui/core/';
import { NoteAdd , Edit , Pageview } from '@material-ui/icons/';

export default function BlogBarActions(props){
  const { user , context , color , setCreatePostIsOpen , history , match } = props;
  const openCreatePost = () => setCreatePostIsOpen(true);
  const editPost = () => history.push(`/blog/edit/${match.params.postId}`);
  const viewPost = () => history.push(`/blog/view/${match.params.postId}`);
  return (
    <React.Fragment>
      {(user.activeUser.permissions.value >= 8 && ["inPostView","inBlog"].includes(context)) ? (
        <Fade in={user.loggedIn} timeout={1500}>
          <IconButton onClick={openCreatePost}>
            <NoteAdd style={{color:color}}/>
          </IconButton>
        </Fade>
        ) : null}
      {(user.activeUser.permissions.value >= 8 && context==="inPostView") ? (
        <Fade in={user.loggedIn} timeout={1500}>
          <IconButton onClick={editPost} color="inherit">
            <Edit style={{color:color}}/>
          </IconButton>
        </Fade>
        ) : null}
      {(user.activeUser.permissions.value >= 8 && context==="inPostEdit") ? (
        <Fade in={user.loggedIn} timeout={1500}>
          <IconButton onClick={viewPost} color="inherit">
            <Pageview style={{color:color}}/>
          </IconButton>
        </Fade>
        ) : null}
    </React.Fragment>
  );
}
