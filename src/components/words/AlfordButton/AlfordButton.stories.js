import React from 'react';
import AlfordButton from './AlfordButton';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Alford Button',
  component: AlfordButton
};

export const PrimaryButton = () => (
  <AlfordButton onClick={action('onClick')} type='primary'>
    Primary Button
  </AlfordButton>
);
PrimaryButton.story = {
  name: 'Primary Button'
};

export const SecondaryButton = () => (
  <AlfordButton onClick={action('onClick')} type='secondary'>
    Secondary Button
  </AlfordButton>
);
SecondaryButton.story = {
  name: 'Secondary Button'
};

export const SuccessButton = () => (
  <AlfordButton onClick={action('onClick')} type='success'>
    Sucess Button
  </AlfordButton>
);
SuccessButton.story = {
  name: 'Sucess Button'
};

export const DangerButton = () => (
  <AlfordButton onClick={action('onClick')} type='danger'>
    Danger Button
  </AlfordButton>
);
DangerButton.story = {
  name: 'Danger Button'
};

export const LinkButton = () => (
  <AlfordButton onClick={action('onClick')} type='link'>
    Link Button
  </AlfordButton>
);
LinkButton.story = {
  name: 'Link Button'
};

export const DisabledButton = () => (
  <AlfordButton onClick={action('onClick')} disabled>
    Disabled Button
  </AlfordButton>
);
DisabledButton.story = {
  name: 'Disabled Button'
};
