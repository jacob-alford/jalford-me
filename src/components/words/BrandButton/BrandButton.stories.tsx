import React from 'react';
import BrandButton from './BrandButton';
import { action } from '@storybook/addon-actions';
import { themeState } from 'global-state';

export default {
  title: 'Brand Button',
  component: BrandButton
};

export const GoogleButtonDarkMode = () => (
  <div
    style={{
      background: '#232323',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      padding: '14px'
    }}>
    <BrandButton
      onClick={action('onClick')}
      prefix='/publicAssets/brand-buttons/google/google-signin'
      width={191}
      height={46}
      theme={themeState.dark}
    />
  </div>
);
GoogleButtonDarkMode.story = {
  name: 'Google Sign In (Dark)'
};

export const GoogleButtonLightMode = () => (
  <div
    style={{
      background: '#cdcdcd',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      padding: '14px'
    }}>
    <BrandButton
      onClick={action('onClick')}
      prefix='/publicAssets/brand-buttons/google/google-signin'
      width={191}
      height={46}
      theme={themeState.light}
    />
  </div>
);
GoogleButtonLightMode.story = {
  name: 'Google Sign In (Light)'
};

export const AppleButtonDarkMode = () => (
  <div
    style={{
      background: '#232323',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      padding: '14px'
    }}>
    <BrandButton
      onClick={action('onClick')}
      prefix='/publicAssets/brand-buttons/apple/apple-signin'
      shadowOverride='drop-shadow(1px 1px .9px rgba(0,0,0,.2))'
      width={191}
      height={46}
      theme={themeState.dark}
    />
  </div>
);
AppleButtonDarkMode.story = {
  name: 'Apple Sign In (Dark)'
};

export const AppleButtonLightMode = () => (
  <div
    style={{
      background: '#cdcdcd',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      padding: '14px'
    }}>
    <BrandButton
      onClick={action('onClick')}
      prefix='/publicAssets/brand-buttons/apple/apple-signin'
      width={191}
      height={46}
      theme={themeState.light}
      shadowOverride='drop-shadow(1px 1px .9px rgba(0,0,0,.2))'
    />
  </div>
);
AppleButtonLightMode.story = {
  name: 'Apple Sign In (Light)'
};
