import {
  actionCategory,
  storeActions,
  alertEnum,
  globalStore,
  actionPayload
} from './_types';
import { defaultState } from '../global-state';
import { getRandomUID } from 'functions';
import simpleTrigger from '../action-constructors/simpleTrigger';
import action from '../action-constructors/action';
import trigger from '../action-constructors/trigger';

const userActions: actionCategory = {
  login: simpleTrigger((store: globalStore, payload: actionPayload = {}) => {
    const { user } = payload;
    if (!user) throw new Error('Payload.user is required to login!');
    store.user.details = user;
    store.user.loggedIn = true;
    store.user.hydrated = true;
  }),
  logout: simpleTrigger((store: globalStore) => {
    store.user.details = defaultState.user.details;
    store.user.loggedIn = false;
    store.user.hydrated = true;
  }),
  updateUser: trigger((actions: storeActions) => {
    const notifyUpdate = actions.user.notifyUpdate(actions);
    return action((store: globalStore, payload: actionPayload = {}) => {
      const { user } = payload;
      if (!user) return;
      store.user.details = user;
      notifyUpdate(store);
    });
  }),
  notifyUpdate: trigger((actions: storeActions) => {
    const addNotification = actions.notifications.add(actions);
    return action(store => {
      addNotification(store, {
        notification: {
          timeout: 4500,
          body: 'Successfully updated user!',
          alertType: alertEnum.success,
          timeoutColor: ['#0F2027', '#203A43', '#2c5364'],
          uid: getRandomUID()
        }
      });
    });
  })
};

export default userActions;
