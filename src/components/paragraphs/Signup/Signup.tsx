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
  submitByPassword: (email: string, password: string, color: string) => void;
  completeSignup: () => void;
}

const mapWidth = (level: number) => `${Math.min(4, Math.max(level, 1)) * 51.72}px`;
const getColorLevel = (level: number) =>
  [C.danger, C.danger, C.warn, C.warn, C.success][level];

const Signup = (props: SignupProps) => {
  const { theme, submitByPassword, completeSignup } = props;
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      await func();
      setLoading(false);
      completeSignup();
    },
    [completeSignup]
  );

  const passwordValid = passwordStrength === 4;
  const emailValid = validateEmail(email);
  const colorValid = !Number.isNaN(parseInt(colour.substr(1), 16));

  useEffect(() => {
    setPasswordStrength(zxcvbn(password).score);
  }, [password]);

  return (
    <SignupDialogue style={signProviderSpring} theme={theme} colour={colour}>
      <Title variant='h4' theme={theme}>
        Signup
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
          autoComplete='email'
        />
        <FormField
          theme={theme}
          value={password}
          type='password'
          error={!(password === '' || passwordValid)}
          onChange={evt => setPassword(evt.target.value)}
          label='Password'
          autoComplete='new-password'
        />
        <PasswordMeter style={strengthSpring} />
        <FormField
          theme={theme}
          error={!colorValid}
          value={colour}
          onChange={evt => setColour(evt.target.value)}
          label='Color'
          type='color'
        />
        <SubmitContainer>
          {loading && (
            <Loader>
              <LoadingCircle color='secondary' />
            </Loader>
          )}
          <Button
            disabled={loading || !passwordValid || !emailValid || !colorValid}
            type={types.success}
            onClick={asyncDo(async () => submitByPassword(email, password, colour))}>
            Submit
          </Button>
        </SubmitContainer>
      </Form>
    </SignupDialogue>
  );
};

export default renderOnPropDiff(Signup);
