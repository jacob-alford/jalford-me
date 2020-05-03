import { from, Observable, iif, of } from 'rxjs';
import { mapTo, mergeMap, map, filter, pluck, catchError } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { userDetails } from '../state-model/_types';
import {
  AUTH_SYNC,
  USER_SYNC,
  USER_LOGOUT,
  USER_LOGIN,
  TRIG_USER_SYNC,
  UPDATE_USER
} from '../state-model/_actors';
import { handleError } from './helpers';

import firebase from 'firebase-init';

const db = firebase.firestore();
const usersDb = db.collection('users');
const accessUserDB = (uid: string): Observable<firebase.firestore.DocumentData> =>
  from(usersDb.doc(uid).get());

const getUserData = (userDoc: firebase.firestore.DocumentData): userDetails | null => {
  if (userDoc.exists) {
    return userDoc.data();
  } else return null;
};

const setUserData = (
  userUid: string,
  newUserDetails: Partial<userDetails>
): Observable<void> => from(usersDb.doc(userUid).update(newUserDetails));

/*
 * Triggers firestore document retrieval
 * on firebase auth change
 * in: AUTH_SYNC(uid)
 * out: TRIG_USER_SYNC(uid)
 */
export const authSync: Epic = action$ =>
  action$.pipe(
    ofType(AUTH_SYNC),
    map(({ payload }) => ({
      type: TRIG_USER_SYNC,
      payload
    }))
  );

/*
 * On user update, triggers resync with userdb
 * in: UPDATE_USER(userDetails)
 * out: USER_SYNC(userDetails) | USER_LOGOUT
 */
export const updateUser: Epic = (action$, state$) =>
  action$.pipe(
    ofType(UPDATE_USER),
    filter(action => Boolean(action.payload)),
    pluck('payload'),
    mergeMap(userDetails =>
      setUserData(state$.value.user.details.uid, userDetails).pipe(
        map(() => ({
          type: TRIG_USER_SYNC,
          payload: state$.value.user.details.uid
        })),
        catchError((err, src) => {
          console.error(err);
          return src;
        })
      )
    ),
    handleError()
  );

/*
 * Retrieves user document from firestore
 * in: TRIG_USER_SYNC(uid)
 * out: USER_SYNC(userDetails) | USER_LOGOUT
 */
export const userSync: Epic = action$ =>
  action$.pipe(
    ofType(TRIG_USER_SYNC),
    mergeMap(({ payload: uid }) =>
      accessUserDB(uid).pipe(
        map(userDoc => getUserData(userDoc)),
        mergeMap(userData =>
          iif(
            () => userData !== null,
            of({
              type: USER_SYNC,
              payload: userData
            }),
            of({
              type: USER_LOGOUT,
              payload: null
            })
          )
        )
      )
    ),
    handleError()
  );

/*
 * Sets user to logged in / hydrated once
 * UserDoc has been retrived from firestore
 * in: USER_SYNC()
 * out: USER_LOGIN
 */
export const userLogin: Epic = action$ =>
  action$.pipe(
    ofType(USER_SYNC),
    mapTo({
      type: USER_LOGIN,
      payload: null
    })
  );
