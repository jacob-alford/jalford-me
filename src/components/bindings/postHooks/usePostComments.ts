import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase-init';
import { postComment, ADD_COMMENTS } from 'global-state';
import { handleError } from 'global-state/epics/helpers';

const db = firebase.firestore();
const getCommentCollection = (path: string) => db.collection(`${path}/comments`);

const getComments = (snapshot: firebase.firestore.QuerySnapshot): postComment[] => {
  const comments: postComment[] = [];
  snapshot.forEach(item => {
    const id = item.id;
    const comment = item.data();
    comments.push({
      body: comment.body,
      date: (comment.date as firebase.firestore.Timestamp).toDate(),
      depth: comment.depth,
      parentId: comment.parentId,
      user: comment.user,
      id
    });
  });
  return comments;
};

const usePostComments = (postIndex: number, path: string) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (postIndex === -1 || !path) return;
    const comments$ = new Subject<firebase.firestore.QuerySnapshot>();
    const unsub = getCommentCollection(path).onSnapshot(comments$);
    comments$
      .pipe(
        map(commentSnap => getComments(commentSnap)),
        map(comments => ({
          type: ADD_COMMENTS,
          payload: {
            index: postIndex,
            comments
          }
        })),
        handleError()
      )
      .subscribe(dispatch);
    return () => {
      comments$.unsubscribe();
      unsub();
    };
  }, [path, postIndex, dispatch]);
};

export default usePostComments;
