import React from 'react';
import { useDispatch } from 'react-redux';
import Brightness7 from '@material-ui/icons/Brightness7';
import Brightness3 from '@material-ui/icons/Brightness3';
import { THEME_TOG, useStoreState, themeState } from 'global-state';
import { CircleButton } from './styles';

const ThemeCircle = () => {
  const theme = useStoreState(store => store.theme);
  const dispatch = useDispatch();
  return (
    <CircleButton mode={theme} onClick={() => dispatch({ type: THEME_TOG })}>
      {theme === themeState.light ? <Brightness3 /> : <Brightness7 />}
    </CircleButton>
  );
};

export default ThemeCircle;
