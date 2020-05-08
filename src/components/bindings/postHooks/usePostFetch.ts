import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CONCAT_POSTS, blogPost } from 'global-state';
import fb from 'firebase';
import firebase from 'firebase-init';

const db = firebase.firestore();

const fetchBlogDetails = (collection: string, subCollection: string) =>
  db.collection('authorship').doc(collection).collection(subCollection);

const getPosts = (snapshot: fb.firestore.QuerySnapshot): blogPost[] => {
  const outArr: blogPost[] = [];
  snapshot.forEach(post => outArr.push(post.data() as blogPost));
  return outArr;
};

const usePostFetch = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const dsm$ = new Subject<fb.firestore.QuerySnapshot>();
    const dsmUnsub = fetchBlogDetails(
      'the-duncan-strauss-mysteries',
      'chapters'
    ).onSnapshot(dsm$);
    dsm$
      .pipe(
        map(dsmSnapshot => getPosts(dsmSnapshot)),
        tap(() => 'Updating Duncan Posts'),
        map(posts => ({
          type: CONCAT_POSTS,
          payload: posts
        }))
      )
      .subscribe(dispatch);
    return () => {
      dsm$.unsubscribe();
      dsmUnsub();
    };
  }, [dispatch]);
  useEffect(() => {
    const phil$ = new Subject<fb.firestore.QuerySnapshot>();
    const philUnsub = fetchBlogDetails('posts', 'philosophy').onSnapshot(phil$);
    phil$
      .pipe(
        map(philSnap => getPosts(philSnap)),
        tap(() => 'Updating philosophy Posts'),
        map(posts => ({
          type: CONCAT_POSTS,
          payload: posts
        }))
      )
      .subscribe(dispatch);
    return () => {
      phil$.unsubscribe();
      philUnsub();
    };
  }, [dispatch]);
};

export default usePostFetch;
