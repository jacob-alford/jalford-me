import React, { useState, useEffect } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Lock from '@material-ui/icons/Lock';
import Eject from '@material-ui/icons/Eject';

import firebase from 'firebase-init';

import { useStoreState, alertEnum } from 'global-state';
import useRedirect from 'components/bindings/utilityHooks/useRedirect';
import useNotify from 'components/bindings/hooks/useNotify';

import LoginDialogue from 'components/sentences/LoginDialogue/LoginDialogue';
import SignupDialogue from 'components/sentences/SignupDialogue/SignupDialogue';

import { AccountIcon, CircleButton } from './styles';

const UserCircle = () => {
  const theme = useStoreState(store => store.theme);
  const user = useStoreState(store => store.user);
  const redirect = useRedirect('/user') as () => void;
  const notify = useNotify({ timeout: 4500 });
  /*
   * <- Menu Popup ->
   */
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const openModal = (evt: React.MouseEvent<HTMLElement>) =>
    setMenuAnchor(evt.currentTarget);
  const closeModal = () => setMenuAnchor(null);
  /*
   * <- Signin/Signout Popup ->
   */
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  useEffect(() => {
    if (user.loggedIn && signInOpen) setSignInOpen(false);
    if (user.loggedIn && signUpOpen) setSignUpOpen(false);
  }, [user, signInOpen, signUpOpen]);
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
      <LoginDialogue signInOpen={signInOpen} setSignInOpen={setSignInOpen} />
      <SignupDialogue signUpOpen={signUpOpen} setSignUpOpen={setSignUpOpen} />
      <Menu
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={Boolean(menuAnchor)}
        anchorEl={menuAnchor}
        onClose={closeModal}>
        {!user.loggedIn && [
          <MenuItem
            key='sign-in-button'
            onClick={() => {
              setSignInOpen(true);
              setMenuAnchor(null);
            }}>
            <ListItemIcon>
              <LockOpenIcon />
            </ListItemIcon>
            <ListItemText>Sign In</ListItemText>
          </MenuItem>,
          <MenuItem
            key='sign-up-button'
            onClick={() => {
              setSignUpOpen(true);
              setMenuAnchor(null);
            }}>
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText>Sign Up</ListItemText>
          </MenuItem>
        ]}
        {user.loggedIn && [
          <MenuItem
            key='account-button'
            onClick={() => {
              redirect();
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
