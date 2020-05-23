import React from 'react';
import Field from './AlfordField';
import { select, withKnobs } from '@storybook/addon-knobs';
import { themeState } from 'global-state';
import C from 'theme-constants';

export default {
  title: 'Alford Field',
  decorators: [withKnobs],
  component: Field
};

export const AlfordField = () => {
  const theme = select(
    'Theme',
    { light: themeState.light, dark: themeState.dark },
    themeState.light
  );
  return (
    <div
      style={{
        background: C.contBackAlt(theme),
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        padding: '14px'
      }}>
      <Field
        theme={theme}
        label='Light Theme'
        variant={select(
          'MUI Variants',
          { Standard: 'standard', Filled: 'filled', Outlined: 'outlined' },
          'outlined'
        )}
      />
    </div>
  );
};
AlfordField.story = {
  name: 'Alford Field'
};
