import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Brightness7 from '@material-ui/icons/Brightness7';
import Brightness3 from '@material-ui/icons/Brightness3';

import { themeHook } from 'theme';

const useClasses = themeHook({
  toggler: {
    color: ({ mode }) => (mode === 'light' ? 'rgba(0,0,0,.54)' : 'rgba(255,255,255,.54)'),
    transition: 'color .5s'
  }
});

export default function LightDarkToggler(props) {
  const { mode, toggle } = props;
  const classes = useClasses(props);
  return (
    <IconButton onClick={toggle} className={classes.toggler}>
      {mode === 'light' ? <Brightness3 /> : null}
      {mode === 'dark' ? <Brightness7 /> : null}
    </IconButton>
  );
}
