import React, { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { userState, themeState } from 'global-state';

import { themeHook } from 'theme';

const getLightIconColor = (isEditing: boolean) =>
  isEditing ? 'rgba(0,0,0,.5)' : 'rgba(0,0,0,1)';
const getDarkIconColor = (isEditing: boolean) =>
  isEditing ? 'rgba(255,255,255,.5)' : 'rgba(255,255,255,1)';
const getIconColor = (tldState: string, isEditing: boolean) =>
  tldState === 'light' ? getLightIconColor(isEditing) : getDarkIconColor(isEditing);

const useClasses = themeHook({
  edit: {
    color: (config: { tldState: string; isEditing: boolean }) =>
      getIconColor(config.tldState, config.isEditing)
  }
});

export default function CommentActions(props: {
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
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmPermDelete, setConfirmPermDelete] = useState(false);
  const { theme: tldState } = props;
  const classes = useClasses({ tldState, ...props });
  const { loggedUser, user, edit, remove, permDelete, isEditing } = props;
  return (
    <React.Fragment>
      {loggedUser.details.uid === user.uid ? (
        <IconButton onClick={edit} disabled={isEditing}>
          <EditIcon className={classes.edit} />
        </IconButton>
      ) : null}
      {loggedUser.details.uid === user.uid ||
      loggedUser.details.permissions.value === 10 ? (
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
      ) : null}
      {loggedUser.details.permissions.value === 10 ? (
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
      ) : null}
    </React.Fragment>
  );
}
