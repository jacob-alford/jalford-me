import { useCallback } from 'react';
import { useSelect , useDispatch } from 'globalState';

export default function useNotifications(){
  const notifications = useSelect('getNotifications');
  const dispatchNotification = useDispatch('remove','notifications');
  const removeNotification = useCallback(
    uid => dispatchNotification({uid}) , [dispatchNotification]
  );
  return { notifications , removeNotification };
}
