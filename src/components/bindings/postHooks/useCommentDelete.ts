import { useCallback } from 'react';
import firebase from 'firebase-init';
import useNotify from 'components/bindings/hooks/useNotify';
import useError from 'components/bindings/stateHooks/useError';
import { alertEnum } from 'global-state';

interface partialComment {
  body: string;
  depth: number;
  parentId: null | string;
  user: {
    image: string;
    uid: string;
    username: string;
  };
}

const db = firebase.firestore();
const getCommentCollection = (path: string) => db.collection(`${path}/comments`);

const useCommentDelete = (postPath: string) => {
  const success = useNotify({
    body: 'Successfully deleted comment',
    alertType: alertEnum.info
  });
  const error = useError();
  return useCallback(
    (uid: string) => {
      getCommentCollection(postPath)
        .doc(uid)
        .delete()
        .then(() => success())
        .catch(error);
    },
    [postPath, error, success]
  );
};

export default useCommentDelete;
