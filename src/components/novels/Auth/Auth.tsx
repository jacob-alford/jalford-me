import React, { useCallback } from 'react';
import renderOnPropDiff from 'helpers/renderOnPropDiff';
import { AuthContainer } from './Auth.styled';
import Signup from 'components/paragraphs/Signup/Signup';
import Signin from 'components/paragraphs/Signin/Signin';
import SignProviders from 'components/paragraphs/SignProviders/SignProviders';
import useGoogleSignin from 'components/bindings/authHooks/useGoogleSignin';
import useGithubSignin from 'components/bindings/authHooks/useGithubSignin';
import usePasswordSignup from 'components/bindings/authHooks/usePasswordSignup';
import useSignin from 'components/bindings/authHooks/useSignin';
import { useStoreState } from 'global-state';

const Auth = () => {
  const theme = useStoreState(store => store.theme);
  const signupWithGoogle = useGoogleSignin();
  const signupWithApple = useCallback(() => Promise.resolve(), []);
  const signupWithGithub = useGithubSignin();
  const signupByPassword = usePasswordSignup();
  const signInByPassword = useSignin();
  return (
    <AuthContainer theme={theme}>
      <SignProviders
        theme={theme}
        submitByGoogle={signupWithGoogle}
        submitByApple={signupWithApple}
        submitByGithub={signupWithGithub}
      />
      <Signin theme={theme} signinByPassword={signInByPassword} />
      <Signup theme={theme} submitByPassword={signupByPassword} />
    </AuthContainer>
  );
};

export default renderOnPropDiff(Auth);
