import React from 'react';

import { themeHook } from 'theme';

const resolveDir = dir => (dir === 'col' || dir === 'column' ? 'column' : 'row');
const resolveWrap = wrap =>
  wrap ? (typeof wrap === 'string' ? wrap : 'wrap') : 'nowrap';

const useClasses = themeHook({
  container: {
    display: 'flex',
    justifyContent: ({ justify = 'center' }) => justify,
    alignItems: ({ align = 'center' }) => align,
    flexWrap: ({ wrap = 'wrap' }) => resolveWrap(wrap),
    flexDirection: ({ direction = 'column' }) => resolveDir(direction)
  }
});

const cat = (...str) => str.join(' ');

export default function Holder(props) {
  const { style, className, onClick } = props;
  const classes = useClasses(props);
  return (
    <div className={cat(className, classes.container)} style={style} onClick={onClick}>
      {props.children}
    </div>
  );
}
