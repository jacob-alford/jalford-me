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
      variant={variant}
      value={value}
      onChange={onChange}
      theme={props.theme}
      {...props}
    />
  );
};

export default AlfordField;
