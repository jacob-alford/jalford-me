import { mapTo, skip } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { alertEnum } from './_types';
import { USER_SYNC, NOTIF_ADD } from './_actors';

import { getRandomUID } from 'functions';

export const notifyUserEpic: Epic = action$ =>
  action$.pipe(
    ofType(USER_SYNC),
    skip(1),
    mapTo({
      type: NOTIF_ADD,
      payload: {
        timeout: 4500,
        body: 'Successfully updated user!',
        alertType: alertEnum.success,
        timeoutColor: ['#0F2027', '#203A43', '#2c5364'],
        uid: getRandomUID()
      }
    })
  );
