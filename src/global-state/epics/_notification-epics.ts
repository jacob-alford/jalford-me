import { map, tap } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { NOTIF_ADD, SET_ERROR } from '../state-model/_actors';
import { alertEnum } from '../state-model/_types';
import { getRandomUID } from 'functions';
import formatErrors from '../helpers/formatErrors';

/*
 * Adds a notification on error
 * in: SET_ERROR(uid)
 * out: NOTIF_ADD(uid)
 */
export const notifyError: Epic = action$ =>
  action$.pipe(
    ofType(SET_ERROR),
    tap(() => console.log('setting error notif')),
    tap(({ payload }) => console.error(payload)),
    map(({ payload }) =>
      process.env.NODE_ENV === 'development'
        ? {
            type: NOTIF_ADD,
            payload: {
              body: formatErrors(payload),
              alertType: alertEnum.error,
              timeout: Infinity,
              timeoutColor: ['#0F2027', '#203A43', '#2c5364'],
              uid: getRandomUID()
            }
          }
        : {
            type: NOTIF_ADD,
            payload: {
              body: `Oops!  jalford.me ran into a problem.  Sorry about that!  Here is the Error: ${formatErrors(
                payload
              )}`,
              alertType: alertEnum.error,
              timeout: Infinity,
              timeoutColor: ['#0F2027', '#203A43', '#2c5364'],
              uid: getRandomUID()
            }
          }
    )
  );
