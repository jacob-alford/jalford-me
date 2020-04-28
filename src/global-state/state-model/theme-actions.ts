import { actionCategory, themeState, globalStore } from './_types';
import action from '../action-constructors/action';

const themeActions: actionCategory = {
  toggle: action((state: globalStore) => {
    if (state.theme === themeState.light) state.theme = themeState.dark;
    else state.theme = themeState.light;
  })
};

export default themeActions;
