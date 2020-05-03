import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { SET_ERROR } from '../state-model/_actors';
import formatErrors from '../helpers/formatErrors';

export const devLog = (cb: (val: any) => void) => {
  if (process.env.NODE_ENV === 'development') return tap(cb);
  else return tap(() => {});
};

export const handleError = () =>
  catchError(raw => {
    console.error(raw);
    if (process.env.NODE_ENV === 'development')
      return of({
        type: SET_ERROR,
        payload: {
          message: formatErrors(raw),
          raw
        }
      });
    else
      return of({
        type: SET_ERROR,
        payload: {
          message: `Oops!  My website ran into a problem :-( check the console for details`,
          raw
        }
      });
  });
