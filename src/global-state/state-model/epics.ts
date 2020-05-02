import { Observable } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { actionPayload as AP, alertEnum } from './_types';
import { USER_SYNC, NOTIF_ADD } from './_actors';

import { getRandomUID } from 'functions';

export const notifyUserEpic: Epic = action$ =>
  action$.pipe(
    filter(action => action.type === USER_SYNC),
    mapTo({
      type: NOTIF_ADD,
      payload: {
        notification: {
          timeout: 4500,
          body: 'Successfully updated user!',
          alertType: alertEnum.success,
          timeoutColor: ['#0F2027', '#203A43', '#2c5364'],
          uid: getRandomUID()
        }
      }
    })
  );
