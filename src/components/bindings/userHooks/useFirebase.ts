import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { USER_SYNC, USER_LOGOUT, USER_LOGIN } from 'global-state';

import useInitEffect from 'components/bindings/utilityHooks/useInitEffect';

import firebaseConfig from 'firebase-config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const usersDb = db.collection('users');

const useFirebase = () => {
  const dispatch = useDispatch();
  const unsubscribe = useRef<null | (() => void)>(null);
  useInitEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch({
          type: USER_LOGIN
        });
        unsubscribe.current = usersDb.doc(user.uid).onSnapshot(databaseUser => {
          if (databaseUser.exists) {
            const userData = databaseUser.data() || {};
            dispatch({
              type: USER_SYNC,
              payload: {
                uid: user.uid,
                color: userData.color,
                image: userData.image,
                permissions: userData.permissions,
                username: userData.username,
                puzzles: userData.puzzles
              }
            });
          }
        });
        return;
      }
      dispatch({
        type: USER_LOGOUT
      });
    });
    return unsubscribe.current ? unsubscribe.current() : () => {};
  });
};

export { firebase };

export default useFirebase;
