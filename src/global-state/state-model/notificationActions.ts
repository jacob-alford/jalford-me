import { stateActions } from './types';
import action from '../state-constructors/action';
import remove from 'lodash/remove';

const notificationActions: stateActions = {
  add: action((state, { notification }) => {
    if (!notification)
      throw new Error('Payload.notification is required to add a notification!');
    if (typeof notification === 'string')
      throw new Error(
        'Payload.notification needs to be a notification object to construct a notification!'
      );
    state.notifications.unshift(notification);
  }),
  remove: action((state, { notification }) => {
    if (!notification)
      throw new Error('Payload.notification is required to remove a notification!');
    if (typeof notification !== 'string')
      throw new Error(
        'Payload.notification needs to be a notification UID to remove a notification!'
      );
    state.notifications = state.notifications.filter(({ uid }) => uid !== notification);
  })
};

export default notificationActions;
