import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Lock from '@material-ui/icons/Lock';
import Eject from '@material-ui/icons/Eject';

import firebase from 'firebase-init';

import { useStoreState, alertEnum } from 'global-state';
import useRedirect from 'components/bindings/utilityHooks/useRedirect';
import useNotify from 'components/bindings/hooks/useNotify';

import { AccountIcon, CircleButton } from './UserCircle.styled';

const UserCircle = () => {
  const theme = useStoreState(store => store.theme);
  const user = useStoreState(store => store.user);
  const redirect = useRedirect() as (str: string) => void;
  const notify = useNotify({ timeout: 4500 });
  /*
   * <- Menu Popup ->
   */
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const openModal = (evt: React.MouseEvent<HTMLElement>) =>
    setMenuAnchor(evt.currentTarget);
  const closeModal = () => setMenuAnchor(null);

  const handleSignout = async () => {
    setMenuAnchor(null);
    await firebase.auth().signOut();
    notify({
      body: 'Successfully signed out!',
      alertType: alertEnum.info
    });
  };
  return (
    <>
      <Menu
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={Boolean(menuAnchor)}
        anchorEl={menuAnchor}
        onClose={closeModal}>
        {!user.loggedIn && [
          <MenuItem
            key='sign-in-up-button'
            onClick={() => {
              redirect('/auth');
              setMenuAnchor(null);
            }}>
            <ListItemIcon>
              <LockOpenIcon />
            </ListItemIcon>
            <ListItemText>Sign In / Sign Up</ListItemText>
          </MenuItem>
        ]}
        {user.loggedIn && [
          <MenuItem
            key='account-button'
            onClick={() => {
              redirect('/user');
              setMenuAnchor(null);
            }}>
            <ListItemIcon>
              <Lock />
            </ListItemIcon>
            <ListItemText primary='Account' />
          </MenuItem>,
          <MenuItem key='sign-out-button' onClick={handleSignout}>
            <ListItemIcon>
              <Eject />
            </ListItemIcon>
            <ListItemText primary='Sign Out' />
          </MenuItem>
        ]}
      </Menu>
      <CircleButton mode={theme} onClick={openModal}>
        {!Boolean(user.details.image) && <AccountIcon />}
        {Boolean(user.details.image) && <Avatar src={user.details.image} />}
      </CircleButton>
    </>
  );
};

export default UserCircle;
