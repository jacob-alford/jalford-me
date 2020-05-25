import React, { useState, useCallback } from 'react';
import { useSpring } from 'react-spring';
import renderOnPropDiff from 'helpers/renderOnPropDiff';
import FormField from 'components/words/AlfordField/AlfordField';
import { types } from 'components/words/AlfordButton/AlfordButton';
import { themeState } from 'global-state';
import {
  Button,
  SigninDialogue,
  Title,
  Divider,
  Form,
  SubmitContainer,
  Loader,
  LoadingCircle
} from './Signin.styled';

interface SigninProps {
  theme: themeState;
  signinByPassword: (email: string, password: string) => void;
}

const Signin = (props: SigninProps) => {
  const { theme, signinByPassword } = props;
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signinSpring = useSpring({
    opacity: 1,
    transform: 'scale3d(1,1,1)',
    from: {
      opacity: 0,
      transform: 'scale3d(0.69, 0.69, 0.69)'
    },
    delay: 269
  });

  const asyncDo = useCallback(
    (func: () => Promise<void>) => async () => {
      setLoading(true);
      await func();
      setLoading(false);
    },
    []
  );

  const emailValid = email !== '';
  const passwordValid = password !== '';

  return (
    <SigninDialogue style={signinSpring} theme={theme}>
      <Title variant='h4' theme={theme}>
        Sign In
      </Title>
      <Divider theme={theme} />
      <Form noValidate theme={theme}>
        <FormField
          theme={theme}
          value={email}
          onChange={evt => setEmail(evt.target.value)}
          label='Email'
          type='email'
          autoComplete='email'
        />
        <FormField
          theme={theme}
          value={password}
          type='password'
          onChange={evt => setPassword(evt.target.value)}
          label='Password'
          autoComplete='new-password'
        />
        <SubmitContainer>
          {loading && (
            <Loader>
              <LoadingCircle color='secondary' />
            </Loader>
          )}
          <Button
            disabled={loading || !passwordValid || !emailValid}
            type={types.success}
            onClick={asyncDo(async () => signinByPassword(email, password))}>
            Submit
          </Button>
        </SubmitContainer>
      </Form>
    </SigninDialogue>
  );
};

export default renderOnPropDiff(Signin);
