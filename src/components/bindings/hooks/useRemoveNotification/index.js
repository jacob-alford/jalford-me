import { useCallback } from 'react';
import { useStoreActions } from 'global-state';

export default function useRemoveNotification() {
  const dispatchNotification = useStoreActions(actions => actions.notifications.remove);
  const removeNotification = useCallback(
    notification => dispatchNotification({ notification }),
    [dispatchNotification]
  );
  return removeNotification;
}
