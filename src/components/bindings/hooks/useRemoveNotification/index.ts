import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NOTIF_REM } from 'global-state';

export default function useRemoveNotification() {
  const dispatchNotification = useDispatch();
  const removeNotification = useCallback(
    (notrifStr: string) => dispatchNotification({ type: NOTIF_REM, payload: notrifStr }),
    [dispatchNotification]
  );
  return removeNotification;
}
