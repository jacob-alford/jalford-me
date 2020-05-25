import React, { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { EditIcon } from '../Comment.styled';
import { userState, themeState } from 'global-state';

interface CommentActionsProps {
  loggedUser: userState;
  user: {
    image: string;
    uid: string;
    username: string;
  };
  edit: () => void;
  remove: () => void;
  permDelete: () => void;
  isEditing: boolean;
  theme: themeState;
}

const CommentActions = (props: CommentActionsProps) => {
  const { theme, loggedUser, user, edit, remove, permDelete, isEditing } = props;
  const [confirmPermDelete, setConfirmPermDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <>
      {loggedUser.details.uid === user.uid && (
        <IconButton onClick={edit} disabled={isEditing}>
          <EditIcon theme={theme} isediting={isEditing.toString()} />
        </IconButton>
      )}
      {(loggedUser.details.uid === user.uid ||
        loggedUser.details.permissions.value === 10) && (
        <IconButton
          onClick={
            confirmDelete
              ? () => {
                  setConfirmDelete(false);
                  remove();
                }
              : () => setConfirmDelete(true)
          }
          color={confirmDelete ? 'secondary' : 'primary'}>
          <DeleteIcon />
        </IconButton>
      )}
      {loggedUser.details.permissions.value === 10 && (
        <IconButton
          onClick={
            confirmPermDelete
              ? () => {
                  setConfirmPermDelete(false);
                  permDelete();
                }
              : () => setConfirmPermDelete(true)
          }
          color={confirmPermDelete ? 'secondary' : 'primary'}>
          <DeleteForeverIcon />
        </IconButton>
      )}
    </>
  );
};

export default CommentActions;
