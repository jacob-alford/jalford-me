import { actionCategory, globalStore, storeActions, actionPayload } from './_types';
import action from '../action-constructors/action';

const notificationActions: actionCategory = {
  add: action((store: globalStore, actions: storeActions, payload: actionPayload) => {
    const { notification } = payload;
    if (!notification)
      throw new Error('Payload.notification is required to add a notification!');
    if (typeof notification === 'string')
      throw new Error(
        'Payload.notification needs to be a notification object to construct a notification!'
      );
    store.notifications.unshift(notification);
  }),
  remove: action((store: globalStore, actions: storeActions, payload: actionPayload) => {
    const { notification } = payload;
    if (!notification)
      throw new Error('Payload.notification is required to remove a notification!');
    if (typeof notification !== 'string')
      throw new Error(
        'Payload.notification needs to be a notification UID to remove a notification!'
      );
    store.notifications = store.notifications.filter(({ uid }) => uid !== notification);
  })
};

export default notificationActions;
