import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { firebase } from 'index';
import { alertEnum, SET_ERROR } from 'global-state';
import useNotify from 'components/bindings/hooks/useNotify';
import useRedirect from 'components/bindings/utilityHooks/useRedirect';

const useSignin = () => {
  const dispatch = useDispatch();
  const redirect = useRedirect('/') as () => void;
  const notifySuccess = useNotify({
    body: 'Succesfully signed in!',
    alertType: alertEnum.success
  });
  return useCallback(
    async (email: string, password: string) => {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        notifySuccess();
        redirect();
      } catch (err) {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
          dispatch({
            type: SET_ERROR,
            payload: new Error('Username or password not recognized')
          });
          return;
        }
        dispatch({
          type: SET_ERROR,
          payload: err
        });
      }
    },
    [dispatch, notifySuccess, redirect]
  );
};

export default useSignin;
