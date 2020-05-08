import { forkJoin, ObservableInput, from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { tap, mapTo, mergeMap, map } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import concat from 'lodash/concat';
import find from 'lodash/find';
import merge from 'lodash/merge';
import { firebase } from 'index';

import {
  INITIAL_LOAD,
  UPDATE_POSTS,
  TRIG_BODY_UPDATE,
  ADD_BODY
} from '../state-model/_actors';
import { blogPost } from '../state-model/_types';
import { getRandomUID } from 'functions';

const db = firebase.firestore();

const fetchBlogDetails = (collection: string, subCollection: string) =>
  from(db.collection('authorship').doc(collection).collection(subCollection).get());

const fetchGitHubObject = (path: string) =>
  ajax(`https://api.github.com/repos/jacob-alford/authorship/contents/${path}`);

const fetchPostList = (category: string) =>
  mergeMap(
    () => fetchGitHubObject(category),
    (posts: Partial<blogPost>[], ajax: { response: { path: string; name: string }[] }) =>
      concat(
        posts,
        ajax.response.map(({ path, name }) => ({
          body: null,
          id: name.split('.')[0],
          category,
          path
        }))
      )
  );

/*
 * Fetches a list of blog posts
 * in: INITIAL_LOAD()
 * out: UPDATE_POSTS(post[])
 */
export const fetchBlogPosts: Epic = action$ =>
  action$.pipe(
    ofType(INITIAL_LOAD),
    mapTo([]),
    /* Fetch list of posts */
    fetchPostList('the-duncan-strauss-mysteries'),
    fetchPostList('philosophy'),
    mergeMap(
      () => fetchBlogDetails('the-duncan-strauss-mysteries', 'chapters'),
      (posts, snapshot) => {
        const mergedPosts: blogPost[] = [];
        snapshot.forEach(snap => {
          const postId = snap.id;
          const metadata = snap.data();
          const pathData = find(posts, post => post.id === postId);
          mergedPosts.push(merge(pathData, metadata) as blogPost);
        });
        // return concat();
      }
    ),
    tap(val => console.info(val)),
    mapTo({
      type: UPDATE_POSTS,
      payload: []
    })
  );

/*
 * Fetches a particular blog post
 * in: INITIAL_LOAD()
 * out: UPDATE_POSTS(post[])
 */
export const fetchBlogPost: Epic = action$ =>
  action$.pipe(
    ofType(TRIG_BODY_UPDATE),
    mergeMap(
      ({ payload }) => fetchGitHubObject(payload),
      (_, ajax) => atob(ajax.response.content)
    ),
    map(payload => ({
      type: ADD_BODY,
      payload
    }))
  );
