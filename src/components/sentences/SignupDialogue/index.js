import React , { useState } from 'react';
import { Slide , Modal , Paper , Grid } from '@material-ui/core/';

import SignupForm from '../../words/SignupForm';

const styles = {
  modal:{
    position:"absolute",
    top:'0px',
    left:'calc(100% - 290px)',
    height:'100vh',
    width:"230px",
    padding:"30px"
  }
}

export default function SignupDialogue(props){
  const { signUpIsOpen , setSignUpIsOpen } = props;
  const [loading,setLoading] = useState(false);
  const closeModal = () => setSignUpIsOpen(false);
  return (
    <Modal open={signUpIsOpen || loading} onClose={closeModal}>
      <Slide direction="left" in={signUpIsOpen} mountOnEnter unmountOnExit>
        <Paper style={styles.modal}>
          <Grid container justify="center">
            <Grid item>
              <SignupForm loading={loading} setLoading={setLoading} />
            </Grid>
          </Grid>
        </Paper>
      </Slide>
    </Modal>
  );
}
