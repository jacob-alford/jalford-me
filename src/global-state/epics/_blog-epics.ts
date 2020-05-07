import { forkJoin, ObservableInput } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { tap, mapTo, mergeMap, map } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import concat from 'lodash/concat';

import {
  INITIAL_LOAD,
  UPDATE_POSTS,
  TRIG_BODY_UPDATE,
  ADD_BODY
} from '../state-model/_actors';
import { blogPost } from '../state-model/_types';
import { getRandomUID } from 'functions';

const fetchGitHubObject = (path: string) =>
  ajax(`https://api.github.com/repos/jacob-alford/authorship/contents/${path}`);

const fetchCategoryPaths = (category: string) =>
  mergeMap(
    () => fetchGitHubObject(category),
    (posts: Partial<blogPost>[], ajax: { response: { path: string }[] }) =>
      concat(
        posts,
        ajax.response.map(({ path: id }) => ({
          id,
          category,
          body: null
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
    fetchCategoryPaths('the-duncan-strauss-mysteries'),
    fetchCategoryPaths('philosophy'),
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
