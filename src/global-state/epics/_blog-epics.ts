import { ajax } from 'rxjs/ajax';
import { mergeMap, map } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';

import { TRIG_BODY_UPDATE, ADD_BODY } from '../state-model/_actors';

const fetchGitHubObject = (path: string) =>
  ajax(`https://api.github.com/repos/jacob-alford/authorship/contents/${path}`);

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
