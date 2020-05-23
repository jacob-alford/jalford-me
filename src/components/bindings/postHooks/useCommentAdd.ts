import { useCallback } from 'react';
import firebase from 'firebase-init';
import useNotify from 'components/bindings/hooks/useNotify';
import useError from 'components/bindings/stateHooks/useError';
import { postComment, alertEnum } from 'global-state';
import { getRandomUID } from 'functions';

interface partialComment {
  body: string;
  depth: number;
  parentId: null | string;
  user: {
    image: string;
    uid: string;
    username: string;
    color: string;
  };
}

const db = firebase.firestore();
const getCommentCollection = (path: string) => db.collection(`${path}/comments`);

const useCommentAdd = (postPath: string) => {
  const success = useNotify({
    body: 'Successfully added comment!',
    alertType: alertEnum.success
  });
  const error = useError();
  return useCallback(
    (newComment: partialComment) => {
      const uid = getRandomUID();
      const finalComment: postComment = {
        date: new Date(),
        id: uid,
        body: newComment.body,
        depth: newComment.depth,
        parentId: newComment.parentId,
        user: {
          image: newComment.user.image,
          uid: newComment.user.uid,
          username: newComment.user.username,
          color: newComment.user.color
        }
      };
      getCommentCollection(postPath)
        .doc(uid)
        .set(finalComment)
        .then(() => success())
        .catch(error);
    },
    [postPath, error, success]
  );
};

export default useCommentAdd;
