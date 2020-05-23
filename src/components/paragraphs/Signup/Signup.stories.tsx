import React from 'react';
import { action } from '@storybook/addon-actions';
import Signup from './Signup';
import { themeState } from 'global-state';

export default {
  title: 'Signup Dialogue',
  component: Signup
};

export const SignupDialogueDarkTheme = () => (
  <div
    style={{
      background: '#232323',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      padding: '14px'
    }}>
    <Signup
      submitByPassword={action('Submit by Password')}
      submitByGoogle={action('Submit by Google')}
      submitByApple={action('Submit by Apple')}
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
      submitByGoogle={action('Submit by Google')}
      submitByApple={action('Submit by Apple')}
      theme={themeState.light}
    />
  </div>
);
SignupDialogueLightTheme.story = {
  name: 'Signup Dialogue (Light Theme)'
};
