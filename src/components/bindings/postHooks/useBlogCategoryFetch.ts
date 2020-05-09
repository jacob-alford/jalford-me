import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONCAT_POSTS, blogPost } from 'global-state';
import fb from 'firebase';
import firebase from 'firebase-init';

const db = firebase.firestore();

const fetchBlogDetails = (collection: string, subCollection: string) =>
  db.collection('authorship').doc(collection).collection(subCollection);

const getPosts = (
  snapshot: fb.firestore.QuerySnapshot,
  group: string,
  pathPrefix: string
): blogPost[] => {
  const outArr: blogPost[] = [];
  snapshot.forEach(post => {
    const id = post.id;
    const data = post.data();
    outArr.push({
      date: (data.date as firebase.firestore.Timestamp).toDate(),
      comments: null,
      public: data.public as boolean,
      tags: data.tags as string[],
      title: data.title as string,
      category: group,
      body: null,
      path: `${pathPrefix}/${id}.md`,
      id
    });
  });
  return outArr;
};

const useBlogCategoryFetch = (group: string, category: string, pathPrefix: string) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const post$ = new Subject<fb.firestore.QuerySnapshot>();
    const postUnsub = fetchBlogDetails(group, category).onSnapshot(post$);
    post$
      .pipe(
        map(postSnapshot => getPosts(postSnapshot, group, pathPrefix)),
        map(posts => ({
          type: CONCAT_POSTS,
          payload: posts
        }))
      )
      .subscribe(dispatch);
    return () => {
      post$.unsubscribe();
      postUnsub();
    };
  }, [dispatch, group, category, pathPrefix]);
};

export default useBlogCategoryFetch;
