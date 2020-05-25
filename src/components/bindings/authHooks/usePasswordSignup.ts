import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { firebase } from 'index';
import { alertEnum, SET_ERROR } from 'global-state';
import useNotify from 'components/bindings/hooks/useNotify';
import useRedirect from 'components/bindings/utilityHooks/useRedirect';

const db = firebase.firestore();
const usersDb = db.collection('users');

const accessUserDB = (uid: string): firebase.firestore.DocumentData => usersDb.doc(uid);

const usePasswordSignup = () => {
  const dispatch = useDispatch();
  const redirect = useRedirect('/') as () => void;
  const notifySuccess = useNotify({
    body: 'Succesfully created user!',
    alertType: alertEnum.success
  });
  return useCallback(
    async (email: string, displayName: string, password: string, color: string) => {
      try {
        const userCredential = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (!userCredential.user?.uid)
          throw new Error('User.uid not returned by firebase.auth()!');
        accessUserDB(userCredential.user.uid).set({
          username: displayName,
          uid: userCredential.user.uid,
          puzzles: [],
          permissions: {
            value: 1
          },
          image: null,
          color
        });
        notifySuccess();
        redirect();
      } catch (err) {
        dispatch({
          type: SET_ERROR,
          payload: err
        });
      }
    },
    [dispatch, notifySuccess, redirect]
  );
};

export default usePasswordSignup;
