import React, { useCallback } from 'react';
import Slide from '@material-ui/core/Slide';
import Modal from '@material-ui/core/Modal';
import renderOnPropDiff from 'helpers/renderOnPropDiff';
import { ModalPaper } from './SignupDialogue.styled';
import Signup from 'components/paragraphs/Signup/Signup';
import useGoogleSignin from 'components/bindings/authHooks/useGoogleSignin';
import { themeState } from 'global-state';

interface SignupDialogueProps {
  signUpOpen: boolean;
  setSignUpOpen: (val: boolean) => void;
  theme: themeState;
}

const SignupDialogue = (props: SignupDialogueProps) => {
  const { signUpOpen, setSignUpOpen, theme } = props;
  const closeModal = useCallback(() => setSignUpOpen(false), [setSignUpOpen]);
  const signupWithGoogle = useGoogleSignin();
  const signupWithApple = useCallback(() => Promise.resolve(), []);
  const signupWithGithub = useCallback(() => Promise.resolve(), []);
  const signupByPassword = useCallback(() => Promise.resolve(), []);
  return (
    <Modal open={signUpOpen} onClose={closeModal}>
      <Slide direction='left' in={signUpOpen} mountOnEnter unmountOnExit>
        <ModalPaper>
          <Signup
            theme={theme}
            completeSignup={closeModal}
            submitByPassword={signupByPassword}
            submitByGoogle={signupWithGoogle}
            submitByApple={signupWithApple}
            submitByGithub={signupWithGithub}
          />
        </ModalPaper>
      </Slide>
    </Modal>
  );
};

export default renderOnPropDiff(SignupDialogue);
