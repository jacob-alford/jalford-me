import { storeActionCategory, notificationPayload as NP } from './_types';
import { notificationActors } from './_actors';
import action from '../action-constructors/action';

const notificationActions: storeActionCategory<NP> = {
  [notificationActors.add]: action<NP>((store, action) => {
    const notification = action?.payload;
    if (!notification)
      throw new Error('Payload.notification is required to add a notification!');
    if (typeof notification === 'string')
      throw new Error(
        'Payload.notification needs to be a notification object to construct a notification!'
      );
    store.notifications.unshift(notification);
  }),
  [notificationActors.remove]: action<NP>((store, action) => {
    const notification = action?.payload;
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
