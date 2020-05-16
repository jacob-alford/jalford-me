import React from 'react';
import Button, { SurfaceProps } from '../Button';
import C from 'theme-constants';

const Operation2 = (props: SurfaceProps) => {
  const { onClick, children } = props;
  return (
    <Button onClick={onClick} backgroundColor={C.acc(2)} color={'white'}>
      {children}
    </Button>
  );
};

export default Operation2;
