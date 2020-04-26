import { useRef } from 'react';
import { useStoreActions } from 'global-state';

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
  const setLoggedIn = useStoreActions(store => store.user.login);
  const setLoggedOut = useStoreActions(store => store.user.logout);
  const unsubscribe = useRef<null | (() => void)>(null);
  useInitEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        unsubscribe.current = usersDb.doc(user.uid).onSnapshot(databaseUser => {
          if (databaseUser.exists) {
            const userData = databaseUser.data() || {};
            setLoggedIn({
              user: {
                uid: user.uid,
                color: userData.color,
                image: userData.image,
                permissions: userData.permissions,
                username: userData.username,
                puzzles: userData.puzzles
              }
            });
            return;
          }
          setLoggedOut();
        });
        return;
      }
      setLoggedOut();
    });
    return unsubscribe.current ? unsubscribe.current() : () => {};
  });
};

export { firebase };

export default useFirebase;
