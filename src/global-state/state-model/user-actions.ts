import { storeActionCategory, userPayload as UP } from './_types';
import { userActors } from './_actors';
import { defaultState } from '../global-state';
import action from '../action-constructors/action';

const userActions: storeActionCategory<UP> = {
  [userActors.syncUser]: action<UP>((store, payload = {}) => {
    const { user } = payload;
    if (!user) {
      store.user.details = defaultState.user.details;
      store.user.loggedIn = false;
      return;
    }
    store.user.details = user;
    store.user.hydrated = true;
  })
};

export default userActions;
