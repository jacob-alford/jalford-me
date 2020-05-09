import React, { useState } from 'react';

import Slide from '@material-ui/core/Slide';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';

import { ModalPaper } from './styled';

import LoginForm from 'components/words/LoginForm';

export default function LoginDialogue(props: {
  signInOpen: boolean;
  setSignInOpen: (val: boolean) => void;
}) {
  const { signInOpen, setSignInOpen } = props;
  const [loading, setLoading] = useState(false);
  const closeModal = () => setSignInOpen(false);
  return (
    <Modal open={signInOpen || loading} onClose={closeModal}>
      <Slide direction='left' in={signInOpen} mountOnEnter unmountOnExit>
        <ModalPaper>
          <Grid container justify='center'>
            <Grid item>
              <LoginForm loading={loading} setLoading={setLoading} />
            </Grid>
          </Grid>
        </ModalPaper>
      </Slide>
    </Modal>
  );
}
