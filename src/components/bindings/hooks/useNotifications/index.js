import { useContext } from 'react';

import { Notifications } from '../../../../index.js';

export default function useNotifications(){
  const { notifications , removeNotification } = useContext(Notifications);
  return { notifications , removeNotification };
}
