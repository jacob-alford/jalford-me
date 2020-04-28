import { actionCategory, globalStore } from './_types';
import action from '../action-constructors/action';

const headerActions: actionCategory = {
  toggle: action((store: globalStore) => {
    if (store.headerIsOpen) store.headerIsOpen = false;
    else store.headerIsOpen = true;
  })
};

export default headerActions;
