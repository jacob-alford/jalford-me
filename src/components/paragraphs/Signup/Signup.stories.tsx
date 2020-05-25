import React from 'react';
import { timer } from 'rxjs';
import { action } from '@storybook/addon-actions';
import Signup from './Signup';
import { themeState } from 'global-state';

export default {
  title: 'Signup Dialogue',
  component: Signup
};

const makeAwaitAction = (text: string, timeout = 3000): (() => Promise<void>) => {
  const act = action(text);
  return () =>
    new Promise(resolve => {
      const timeDo = timer(timeout);
      timeDo.subscribe(() => {
        act();
        resolve();
      });
    });
};

export const SignupDialogueDarkTheme = () => (
  <div
    style={{
      background: '#232323',
      width: '100vw',
      height: '200vh',
      display: 'flex',
      justifyContent: 'center',
      padding: '14px'
    }}>
    <Signup
      submitByPassword={makeAwaitAction('Submit by Password')}
      submitByGithub={makeAwaitAction('Submit by Github')}
      submitByGoogle={makeAwaitAction('Submit by Google')}
      submitByApple={makeAwaitAction('Submit by Apple')}
      completeSignup={action('Signup Complete')}
      theme={themeState.dark}
    />
  </div>
);
SignupDialogueDarkTheme.story = {
  name: 'Signup Dialogue (Dark Theme)'
};

export const SignupDialogueLightTheme = () => (
  <div
    style={{
      background: '#cdcdcd',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      padding: '14px'
    }}>
    <Signup
      submitByPassword={action('Submit by Password')}
      submitByGithub={action('Submit by Github')}
      submitByGoogle={action('Submit by Google')}
      submitByApple={action('Submit by Apple')}
      theme={themeState.light}
    />
  </div>
);
SignupDialogueLightTheme.story = {
  name: 'Signup Dialogue (Light Theme)'
};
