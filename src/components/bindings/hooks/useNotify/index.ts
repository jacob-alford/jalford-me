import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NOTIF_ADD, notificationDetails } from 'global-state';

import { getRandomUID } from 'functions';

const defaultConfig = {
  alertType: 'info', // mui-snackbar variants
  timeoutColor: ['#0F2027', '#203A43', '#2c5364'], // gradient stops
  timeout: 10000 // ms
};

export default function useNotify(compStyle: Partial<notificationDetails> = {}) {
  const dispatch = useDispatch();
  return useCallback(
    (notification: Partial<notificationDetails> = {}) =>
      dispatch({
        type: NOTIF_ADD,
        payload: {
          ...defaultConfig,
          ...compStyle,
          ...notification,
          uid: getRandomUID()
        }
      }),
    [dispatch, compStyle]
  );
}
