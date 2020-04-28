import {
  actionCategory,
  storeActions,
  alertEnum,
  globalStore,
  actionPayload
} from './_types';
import { defaultState } from '../global-state';
import { getRandomUID } from 'functions';
import action from '../action-constructors/action';

const userActions: actionCategory = {
  login: action((store: globalStore, _, payload: actionPayload) => {
    const { user } = payload;
    if (!user) throw new Error('Payload.user is required to login!');
    store.user.details = user;
    store.user.loggedIn = true;
    store.user.hydrated = true;
  }),
  logout: action((store: globalStore) => {
    store.user.details = defaultState.user.details;
    store.user.loggedIn = false;
    store.user.hydrated = true;
  }),
  updateUser: action(
    (store: globalStore, actions: storeActions, payload: actionPayload) => {
      const { user } = payload;
      if (!user) return;
      store.user.details = user;
      actions.user.notifyUpdate(store, actions, payload);
    }
  ),
  notifyUpdate: action((store: globalStore, actions: storeActions) => {
    actions.notifications.add(store, actions, {
      notification: {
        timeout: 4500,
        body: 'Successfully updated user!',
        alertType: alertEnum.success,
        timeoutColor: ['#0F2027', '#203A43', '#2c5364'],
        uid: getRandomUID()
      }
    });
  })
};

export default userActions;
