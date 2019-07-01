import React from 'react';
import { Modal , Typography , Paper , Container } from '@material-ui/core/';

import { StyledAdminLogin } from './style.js';

export default function AdminLogin(props){
  const { isOpen , close } = props;
  return (
    <StyledAdminLogin>
      <Modal open={isOpen} onClose={close}>
        <div className="modalContainer">
          <Paper>
            <Typography variant="h2">
              Testing
            </Typography>
          </Paper>
        </div>
      </Modal>
    </StyledAdminLogin>
  );
}
