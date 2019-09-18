import React , { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function CommentActions(props){
  const [confirmDelete,setConfirmDelete] = useState(false);
  const [confirmPermDelete,setConfirmPermDelete] = useState(false);
  const {
    activeUser,
    commentUser,
    edit,
    remove,
    permDelete,
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
        <IconButton
          onClick={
            (confirmDelete) ?
              () => {
                setConfirmDelete(false);
                remove();
              }
            : () => setConfirmDelete(true)
          }
          color={
            (confirmDelete) ?
              "secondary"
            : "primary"
          }>
          <DeleteIcon />
        </IconButton>
      ) : null}
      {(activeUser.permissions.value === 10) ? (
        <IconButton
          onClick={
            (confirmPermDelete) ?
              () => {
                setConfirmPermDelete(false);
                permDelete();
              }
            : () => setConfirmPermDelete(true)
          }
          color={
            (confirmPermDelete) ?
              "secondary"
            : "primary"
          }>
          <DeleteForeverIcon />
        </IconButton>
      ) : null}
    </React.Fragment>
  );
}
