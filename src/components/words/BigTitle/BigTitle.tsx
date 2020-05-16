import React from 'react';

import { MUITitle, Blue } from './style';

const BeegTitle = (props: { children: string; style: any }) => {
  const { style, children } = props;
  return (
    <MUITitle align='center' variant='h1' style={style}>
      <Blue>{children[0]}</Blue>
      <Blue>{children[1]}</Blue>
      <Blue>{children.slice(2)}</Blue>
    </MUITitle>
  );
};

export default BeegTitle;
