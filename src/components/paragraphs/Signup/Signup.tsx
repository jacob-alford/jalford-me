import React, { useEffect, useState, useCallback } from 'react';
import { useSpring } from 'react-spring';
import zxcvbn from 'zxcvbn';
import renderOnPropDiff from 'helpers/renderOnPropDiff';
import FormField from 'components/words/AlfordField/AlfordField';
import { types } from 'components/words/AlfordButton/AlfordButton';
import { themeState } from 'global-state';
import {
  Button,
  SignupDialogue,
  PasswordMeter,
  Title,
  Divider,
  Form,
  SubmitContainer,
  Loader,
  LoadingCircle
} from './Signup.styled';
import C from 'theme-constants';
import { validateEmail } from 'functions';

interface SignupProps {
  theme: themeState;
  submitByPassword: (
    email: string,
    displayName: string,
    password: string,
    color: string
  ) => void;
}

const mapWidth = (level: number) => `${Math.min(4, Math.max(level, 1)) * 48.5}px`;
const getColorLevel = (level: number) =>
  [C.danger, C.danger, C.warn, C.warn, C.success][level];

const Signup = (props: SignupProps) => {
  const { theme, submitByPassword } = props;
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [colour, setColour] = useState(C.prim(1));
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const strengthSpring = useSpring({
    width: mapWidth(passwordStrength),
    background: getColorLevel(passwordStrength),
    from: {
      width: '0px',
      background: C.danger
    }
  });

  const signProviderSpring = useSpring({
    opacity: 1,
    transform: 'scale3d(1,1,1)',
    from: {
      opacity: 0,
      transform: 'scale3d(0.69, 0.69, 0.69)'
    }
  });

  const asyncDo = useCallback(
    (func: () => Promise<void>) => async () => {
      console.log('fuck');
      setLoading(true);
      await func();
      setLoading(false);
    },
    []
  );

  const displayNameValid = displayName !== '';
  const passwordValid = passwordStrength === 4;
  const emailValid = validateEmail(email);
  const colorValid = !Number.isNaN(parseInt(colour.substr(1), 16));

  useEffect(() => {
    setPasswordStrength(zxcvbn(password).score);
  }, [password]);

  return (
    <SignupDialogue style={signProviderSpring} theme={theme} colour={colour}>
      <Title variant='h4' theme={theme}>
        Sign Up
      </Title>
      <Divider theme={theme} />
      <Form noValidate theme={theme}>
        <FormField
          theme={theme}
          value={email}
          error={!(email === '' || emailValid)}
          onChange={evt => setEmail(evt.target.value)}
          label='Email'
          type='email'
          required
          autoComplete='email'
        />
        <FormField
          theme={theme}
          value={password}
          type='password'
          error={!(password === '' || passwordValid)}
          onChange={evt => setPassword(evt.target.value)}
          label='Password'
          required
          autoComplete='new-password'
        />
        <PasswordMeter style={strengthSpring} />
        <FormField
          theme={theme}
          value={displayName}
          onChange={evt => setDisplayName(evt.target.value)}
          label='Display Name'
          type='name'
          required
          autoComplete='name'
        />
        <FormField
          theme={theme}
          error={!colorValid}
          value={colour}
          onChange={evt => setColour(evt.target.value)}
          label='Color'
          required
          type='color'
        />
        <SubmitContainer>
          {loading && (
            <Loader>
              <LoadingCircle color='secondary' />
            </Loader>
          )}
          <Button
            disabled={
              loading || !displayNameValid || !passwordValid || !emailValid || !colorValid
            }
            type={types.success}
            onClick={asyncDo(async () =>
              submitByPassword(email, displayName, password, colour)
            )}>
            Submit
          </Button>
        </SubmitContainer>
      </Form>
    </SignupDialogue>
  );
};

export default renderOnPropDiff(Signup);
