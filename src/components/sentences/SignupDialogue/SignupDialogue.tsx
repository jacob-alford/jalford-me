import React, { useState } from 'react';

import Slide from '@material-ui/core/Slide';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';

import { ModalPaper } from './styled';
import SignupForm from 'components/words/SignupForm';

export default function SignupDialogue(props: {
  signUpOpen: boolean;
  setSignUpOpen: (val: boolean) => void;
}) {
  const { signUpOpen, setSignUpOpen } = props;
  const [loading, setLoading] = useState(false);
  const closeModal = () => setSignUpOpen(false);
  return (
    <Modal open={signUpOpen || loading} onClose={closeModal}>
      <Slide direction='left' in={signUpOpen} mountOnEnter unmountOnExit>
        <ModalPaper>
          <Grid container justify='center'>
            <Grid item>
              <SignupForm loading={loading} setLoading={setLoading} />
            </Grid>
          </Grid>
        </ModalPaper>
      </Slide>
    </Modal>
  );
}
