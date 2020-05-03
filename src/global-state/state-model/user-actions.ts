import { storeActionCategory, userPayload as UP, stringPayload as SP } from './_types';
import { userActors } from './_actors';
import { defaultState } from '../global-state';
import action from '../action-constructors/action';
import doNothing from '../action-constructors/doNothing';

const userActions: storeActionCategory<UP & SP> = {
  [userActors.userSync]: action<UP>((store, action) => {
    const user = action.payload;
    if (!user) store.user.details = defaultState.user.details;
    else store.user.details = user;
  }),
  [userActors.logoutUser]: action<UP>(store => {
    store.user.details = defaultState.user.details;
    store.user.loggedIn = false;
    store.user.hydrated = true;
  }),
  [userActors.loginUser]: action<UP>(store => {
    store.user.loggedIn = true;
    store.user.hydrated = true;
  }),
  [userActors.authSync]: action<SP>((store, action) => {
    const uid = action?.payload;
    store.user.details.uid = uid;
  }),
  [userActors.triggerUserSync]: doNothing()
};

export default userActions;
