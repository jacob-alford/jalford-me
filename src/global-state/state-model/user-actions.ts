import { storeActionCategory, userPayload as UP } from './_types';
import { userActors } from './_actors';
import { defaultState } from '../global-state';
import action from '../action-constructors/action';

const userActions: storeActionCategory<UP> = {
  [userActors.syncUser]: action<UP>((store, action) => {
    const user = action?.payload;
    if (!user) store.user.details = defaultState.user.details;
    else store.user.details = user;
  }),
  [userActors.logoutUser]: action<UP>(store => {
    store.user.hydrated = true;
    store.user.loggedIn = false;
    store.user.details = defaultState.user.details;
  }),
  [userActors.loginUser]: action<UP>(store => {
    store.user.hydrated = true;
    store.user.loggedIn = true;
  })
};

export default userActions;
