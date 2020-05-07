import { tap } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { INITIAL_LOAD, UPDATE_POSTS } from '../state-model/_actors';
import { alertEnum } from '../state-model/_types';
import { getRandomUID } from 'functions';

/*
 * Fetches blog posts after initial render
 * in: INITIAL_LOAD()
 * out: UPDATE_POSTS(post[])
 */
export const fetchBlogPosts: Epic = action$ =>
  action$.pipe(
    ofType(INITIAL_LOAD),
    tap(v => console.log('initial load'))
  );
