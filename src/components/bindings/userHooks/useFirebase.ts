import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { useDispatch } from 'react-redux';
import { USER_LOGOUT, AUTH_SYNC } from 'global-state';

import useInitEffect from 'components/bindings/utilityHooks/useInitEffect';

import { firebase } from 'index';

const useFirebase = () => {
  const dispatch = useDispatch();
  useInitEffect(() => {
    const authChange$ = new Subject();
    const fbUnsub = firebase.auth().onAuthStateChanged(authChange$);
    authChange$
      .pipe(
        map((user: any) =>
          user
            ? {
                type: AUTH_SYNC,
                payload: user.uid
              }
            : {
                type: USER_LOGOUT,
                payload: null
              }
        )
      )
      .subscribe(dispatch);
    return () => {
      authChange$.unsubscribe();
      fbUnsub();
    };
  });
};

export { firebase };

export default useFirebase;
