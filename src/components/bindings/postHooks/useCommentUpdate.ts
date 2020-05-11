import { useCallback } from 'react';
import firebase from 'firebase-init';
import useNotify from 'components/bindings/hooks/useNotify';
import useError from 'components/bindings/stateHooks/useError';
import { postComment, alertEnum } from 'global-state';

const db = firebase.firestore();
const getCommentCollection = (path: string) => db.collection(`${path}/comments`);

const useCommentUpdate = (postPath: string) => {
  const success = useNotify({
    body: 'Successfully updated comment',
    alertType: alertEnum.info
  });
  const error = useError();
  return useCallback(
    (uid: string, updatedComment: Partial<postComment>) => {
      getCommentCollection(postPath)
        .doc(uid)
        .update(updatedComment)
        .then(() => success())
        .catch(error);
    },
    [postPath, error, success]
  );
};

export default useCommentUpdate;
