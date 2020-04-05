import React from 'react';
import Button, { SurfaceProps } from '../Button';
import C from '../constants';

const Operation1 = (props: SurfaceProps) => {
  const { onClick, children } = props;
  return (
    <Button
      onClick={onClick}
      backgroundColor={C.gray(2)}
      borderColor={C.pink(0)}
      color={C.cyan(0)}>
      {children}
    </Button>
  );
};

export default Operation1;
