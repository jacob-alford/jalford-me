import React, { useEffect, useState, useCallback } from 'react';
import { useSpring } from 'react-spring';
import zxcvbn from 'zxcvbn';
import renderOnPropDiff from 'helpers/renderOnPropDiff';
import BrandButton from 'components/words/BrandButton/BrandButton';
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
  submitByGoogle: () => Promise<void>;
  submitByApple: () => Promise<void>;
  submitByGithub: () => Promise<void>;
  completeSignup: () => void;
}

const mapWidth = (level: number) => `${Math.min(4, Math.max(level, 1)) * 51.72}px`;
const getColorLevel = (level: number) =>
  [C.danger, C.danger, C.warn, C.warn, C.success][level];

const Signup = (props: SignupProps) => {
  const {
    theme,
    submitByPassword,
    submitByGoogle,
    submitByApple,
    submitByGithub,
    completeSignup
  } = props;
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
    <SignupDialogue theme={theme} colour={colour}>
      <Title variant='h4' theme={theme}>
        Signup
      </Title>
      <Divider theme={theme} />
      <BrandButton
        onClick={asyncDo(submitByApple)}
        prefix='/publicAssets/brand-buttons/apple/apple-signin'
        width={191}
        height={46}
        ariaLabel='sign in with apple'
        useHighlight
        theme={theme}
        shadowOverride='drop-shadow(1px 1px .9px rgba(0,0,0,.2))'
        marginOverride='0px 0px 0px 0px'
      />
      <BrandButton
        onClick={asyncDo(submitByGithub)}
        prefix='/publicAssets/brand-buttons/github/github-signin'
        shadowOverride='drop-shadow(1px 1px .9px rgba(0,0,0,.2))'
        marginOverride='0px 0px 0px 0px'
        ariaLabel='sign in with github'
        useHighlight
        width={191}
        height={46}
        theme={theme}
      />
      <BrandButton
        onClick={asyncDo(submitByGoogle)}
        prefix='/publicAssets/brand-buttons/google/google-signin'
        marginOverride='0px 0px 0px 0px'
        ariaLabel='sign in with google'
        width={191}
        height={46}
        theme={theme}
      />

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