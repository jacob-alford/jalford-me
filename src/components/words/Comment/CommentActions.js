import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function CommentActions(props){
  const {
    activeUser,
    commentUser,
    edit,
    remove,
    isEditing
  } = props;
  return (
    <React.Fragment>
      {(activeUser.uid === commentUser.uid) ? (
        <IconButton onClick={edit} disabled={isEditing}>
          <EditIcon />
        </IconButton>
      ) : null}
      {(activeUser.uid === commentUser.uid || activeUser.permissions.value === 10) ? (
        <IconButton onClick={remove} color="secondary">
          <DeleteIcon />
        </IconButton>
      ) : null}
    </React.Fragment>
  );
}
