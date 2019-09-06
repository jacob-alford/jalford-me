import { useContext } from 'react';

import { Notifications } from 'notifications.js';

export default function useNotifications(){
  const { notifications , removeNotification } = useContext(Notifications);
  return { notifications , removeNotification };
}
