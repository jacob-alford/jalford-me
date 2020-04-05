import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';

import NoteAdd from '@material-ui/icons/NoteAdd';
import Edit from '@material-ui/icons/Edit';
import Pageview from '@material-ui/icons/Pageview';

const getPostId = match => (match && match.postId) || '';

export default function BlogBarActions(props) {
  const { user, context, color, setCreatePostIsOpen, history, match } = props;
  const openCreatePost = () => setCreatePostIsOpen(true);
  const editPost = () => history.push(`/posts/edit/${getPostId(match)}`);
  const viewPost = () => history.push(`/posts/view/${getPostId(match)}`);
  return (
    <React.Fragment>
      {user.activeUser.permissions.value >= 8 &&
      ['inPostView', 'inBlog'].includes(context) ? (
        <Fade in={user.loggedIn} timeout={1500}>
          <IconButton onClick={openCreatePost}>
            <NoteAdd style={{ color: color }} />
          </IconButton>
        </Fade>
      ) : null}
      {user.activeUser.permissions.value >= 8 && context === 'inPostView' ? (
        <Fade in={user.loggedIn} timeout={1500}>
          <IconButton onClick={editPost} color='inherit'>
            <Edit style={{ color: color }} />
          </IconButton>
        </Fade>
      ) : null}
      {user.activeUser.permissions.value >= 8 && context === 'inPostEdit' ? (
        <Fade in={user.loggedIn} timeout={1500}>
          <IconButton onClick={viewPost} color='inherit'>
            <Pageview style={{ color: color }} />
          </IconButton>
        </Fade>
      ) : null}
    </React.Fragment>
  );
}
