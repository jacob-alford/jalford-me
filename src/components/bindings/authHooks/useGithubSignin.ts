import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { firebase } from 'index';
import { alertEnum, TRIG_USER_SYNC, SET_ERROR } from 'global-state';
import useNotify from 'components/bindings/hooks/useNotify';
import useRedirect from 'components/bindings/utilityHooks/useRedirect';

const db = firebase.firestore();
const usersDb = db.collection('users');

const accessUserDB = (uid: string): firebase.firestore.DocumentData => usersDb.doc(uid);

const githubProvider = new firebase.auth.GithubAuthProvider();

const useGithubSignin = () => {
  const dispatch = useDispatch();
  const redirect = useRedirect('/') as () => void;
  const notifySuccess = useNotify({
    body: 'Succesfully signed in!',
    alertType: alertEnum.success
  });
  return useCallback(async () => {
    try {
      const userDetails = await firebase.auth().signInWithPopup(githubProvider);
      if (!userDetails.user?.uid) throw new Error('UID not supplied in Auth!');
      const userDoc = await accessUserDB(userDetails.user.uid).get();
      if (!userDoc.exists)
        await accessUserDB(userDetails.user.uid).set({
          username: userDetails.user.displayName,
          uid: userDetails.user.uid,
          puzzles: [],
          permissions: {
            value: 1
          },
          image: userDetails.user.photoURL,
          color: '#14b2c7'
        });
      dispatch({
        type: TRIG_USER_SYNC,
        payload: userDetails.user.uid
      });
      notifySuccess();
      redirect();
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err
      });
    }
  }, [dispatch, notifySuccess, redirect]);
};

export default useGithubSignin;
