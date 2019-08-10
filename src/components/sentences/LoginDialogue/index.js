import React , { useState } from 'react';
import { Slide , Modal , Paper , Grid } from '@material-ui/core/';

import LoginForm from '../../words/LoginForm';

const styles = {
  modal:{
    top:'calc(100% - 263px)',
    left:'calc(100% - 290px)',
    height:"263px",
    width:"230px",
    padding:"30px",
    position:"absolute"
  }
}

export default function LoginDialogue(props){
  const { signInIsOpen , setSignInIsOpen } = props;
  const [loading,setLoading] = useState(false);
  const closeModal = () => setSignInIsOpen(false);
  return (
    <Modal open={signInIsOpen || loading} onClose={closeModal}>
      <Slide direction="left" in={signInIsOpen} mountOnEnter unmountOnExit>
        <Paper style={styles.modal}>
          <Grid container justify="center">
            <Grid item>
              <LoginForm loading={loading} setLoading={setLoading}/>
            </Grid>
          </Grid>
        </Paper>
      </Slide>
    </Modal>
  );
}
