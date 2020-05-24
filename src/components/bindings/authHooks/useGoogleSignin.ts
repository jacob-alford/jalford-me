import { useCallback } from 'react';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { firebase } from 'index';
import { alertEnum } from 'global-state';
import useNotify from 'components/bindings/hooks/useNotify';

const googleProvider = new firebase.auth.GoogleAuthProvider();

const useGoogleSignin = () => {
  const notifyError = useNotify({
    alertType: alertEnum.error
  });
  const notifySuccess = useNotify({
    body: 'Succesfully signed in!',
    alertType: alertEnum.error
  });
  return useCallback(() => {
    const doSignIn = from(firebase.auth().signInWithPopup(googleProvider));
    doSignIn.subscribe(v => console.log(v));
  }, []);
};

export default useGoogleSignin;
