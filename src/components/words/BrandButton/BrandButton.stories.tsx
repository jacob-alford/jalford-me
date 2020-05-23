import React from 'react';
import BrandButton from './BrandButton';
import { action } from '@storybook/addon-actions';
import { select, withKnobs } from '@storybook/addon-knobs';
import { themeState } from 'global-state';
import C from 'theme-constants';

export default {
  title: 'Brand Button',
  component: BrandButton,
  decorators: [withKnobs]
};

export const GoogleButton = () => {
  const theme = select(
    'Theme',
    { light: themeState.light, dark: themeState.dark },
    themeState.light
  );
  return (
    <div
      style={{
        background: C.contBackAlt(theme),
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
        theme={theme}
      />
    </div>
  );
};
GoogleButton.story = {
  name: 'Google Sign In'
};

export const AppleButton = () => {
  const theme = select(
    'Theme',
    { light: themeState.light, dark: themeState.dark },
    themeState.light
  );
  return (
    <div
      style={{
        background: C.contBackAlt(theme),
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
        theme={theme}
        shadowOverride='drop-shadow(1px 1px .9px rgba(0,0,0,.2))'
      />
    </div>
  );
};
AppleButton.story = {
  name: 'Apple Sign In'
};

export const GithubButton = () => {
  const theme = select(
    'Theme',
    { light: themeState.light, dark: themeState.dark },
    themeState.light
  );
  return (
    <div
      style={{
        background: C.contBackAlt(theme),
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
        theme={theme}
      />
    </div>
  );
};
GithubButton.story = {
  name: 'Github Sign In'
};
