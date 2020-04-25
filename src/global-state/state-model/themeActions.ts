import { stateActions, themeState } from './types';
import action from '../state-constructors/action';

const themeActions: stateActions = {
  toggle: action(state => {
    if (state.theme === themeState.light) state.theme = themeState.dark;
    else state.theme = themeState.light;
  })
};

export default themeActions;
