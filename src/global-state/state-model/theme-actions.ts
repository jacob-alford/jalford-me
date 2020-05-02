import { themeState, storeActionCategory, themePayload as TP } from './_types';
import action from '../action-constructors/action';
import { themeActors } from './_actors';

const themeActions: storeActionCategory<TP> = {
  [themeActors.toggle]: action<TP>(state => {
    if (state.theme === themeState.light) state.theme = themeState.dark;
    else state.theme = themeState.light;
  })
};

export default themeActions;
