import { storeActionCategory, headerPayload as HP } from './_types';
import { headerActors } from './_actors';
import action from '../action-constructors/action';

const headerActions: storeActionCategory<HP> = {
  [headerActors.toggle]: action<HP>(store => {
    if (store.headerIsOpen) store.headerIsOpen = false;
    else store.headerIsOpen = true;
  })
};

export default headerActions;
