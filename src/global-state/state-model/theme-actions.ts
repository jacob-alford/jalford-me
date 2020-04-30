import { actionCategory, themeState, globalStore } from './_types';
import simpleTrigger from '../action-constructors/simpleTrigger';

const themeActions: actionCategory = {
  toggle: simpleTrigger((state: globalStore) => {
    if (state.theme === themeState.light) state.theme = themeState.dark;
    else state.theme = themeState.light;
  })
};

export default themeActions;
