import React from 'react';
import { Field } from './AlfordField.styled';
import { themeState } from 'global-state';

interface AlfordFieldProps {
  [key: string]: any;
  theme: themeState;
  variant?: 'standard' | 'outlined' | 'filled';
  value?: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const AlfordField = (props: AlfordFieldProps) => {
  const { variant = 'outlined', value, onChange } = props;
  return (
    <Field
      {...props}
      variant={variant}
      value={value}
      onChange={onChange}
      theme={props.theme}
    />
  );
};

export default AlfordField;
