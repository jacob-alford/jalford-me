import React from 'react';
import { Primary, Success, Danger, Link, Secondary, Disabled } from './style';

export enum types {
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  danger = 'danger',
  link = 'link',
  disabled = 'disabled'
}

interface Props {
  type: types;
  [key: string]: any;
}

const AlfordButton = (props: Props) => {
  const { type, disabled, children } = props;
  if (disabled)
    return (
      <Disabled {...{ ...props, type: undefined }} variant='contained' disabled={true}>
        {children}
      </Disabled>
    );
  if (type === types.primary)
    return (
      <Primary {...{ ...props, type: undefined }} variant='contained'>
        {children}
      </Primary>
    );
  if (type === types.secondary)
    return (
      <Secondary {...{ ...props, type: undefined }} variant='contained'>
        {children}
      </Secondary>
    );
  if (type === types.success)
    return (
      <Success {...{ ...props, type: undefined }} variant='contained'>
        {children}
      </Success>
    );
  if (type === types.danger)
    return (
      <Danger {...{ ...props, type: undefined }} variant='contained'>
        {children}
      </Danger>
    );
  return <Link {...{ ...props, type: undefined }}>{children}</Link>;
};

export default AlfordButton;
