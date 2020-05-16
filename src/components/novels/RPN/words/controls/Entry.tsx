import React from 'react';
import Button, { SurfaceProps } from '../Button';
import C from 'theme-constants';

const Entry = (props: SurfaceProps) => {
  const { onClick, children, flexGrow, toggled } = props;
  return (
    <Button
      onClick={onClick}
      backgroundColor={C.prim(0)}
      flexGrow={flexGrow}
      toggled={toggled ? C.acc(2) : undefined}
      color={'black'}>
      {children}
    </Button>
  );
};

export default Entry;
