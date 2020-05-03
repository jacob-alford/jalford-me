import { map } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { NOTIF_ADD, SET_ERROR } from '../state-model/_actors';
import { alertEnum } from '../state-model/_types';
import { getRandomUID } from 'functions';

/*
 * Adds a notification on error
 * in: SET_ERROR(uid)
 * out: NOTIF_ADD(uid)
 */
export const notifyError: Epic = action$ =>
  action$.pipe(
    ofType(SET_ERROR),
    map(({ payload }) => ({
      type: NOTIF_ADD,
      payload: {
        body: payload.message,
        alertType: alertEnum.error,
        timeout: Infinity,
        timeoutColor: ['#0F2027', '#203A43', '#2c5364'],
        uid: getRandomUID()
      }
    }))
  );
