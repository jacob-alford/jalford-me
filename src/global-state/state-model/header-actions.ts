import { actionCategory, globalStore } from './_types';
import simpleTrigger from '../action-constructors/simpleTrigger';

const headerActions: actionCategory = {
  toggle: simpleTrigger((store: globalStore) => {
    if (store.headerIsOpen) store.headerIsOpen = false;
    else store.headerIsOpen = true;
  })
};

export default headerActions;
