import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SET_ERROR } from '../state-model/_actors';

export const handleError = () =>
  catchError(raw =>
    of({
      type: SET_ERROR,
      payload: raw
    })
  );
