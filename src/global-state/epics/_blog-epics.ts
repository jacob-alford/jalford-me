import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';

import { TRIG_BODY_UPDATE, ADD_BODY } from '../state-model/_actors';

const fetchGitHubObject = (path: string) =>
  ajax(`https://api.github.com/repos/jacob-alford/authorship/contents/${path}`);

const toString = (base64: string): string => {
  const decoded = atob(base64);
  const charZarr = Uint8Array.from({ length: decoded.length }, (_, index) =>
    decoded.charCodeAt(index)
  );
  const returnVal = new TextDecoder('utf-8').decode(charZarr);
  return returnVal;
};

/*
 * Fetches a particular blog post
 * in: INITIAL_LOAD()
 * out: UPDATE_POSTS(post[])
 */
export const fetchBlogPost: Epic = action$ =>
  action$.pipe(
    ofType(TRIG_BODY_UPDATE),
    switchMap(({ payload }) =>
      fetchGitHubObject(payload.path).pipe(
        map(ajax => ({
          body: toString(ajax.response.content),
          index: payload.index
        })),
        catchError(err => {
          console.error(err);
          if (err.response.message === 'Not Found')
            return of({
              body: `*Oops!*\n\nIt seems that this post has yet to be written! 📝`,
              index: payload.index
            });
          else
            return of({
              body: `*Oops!*\n\nThere was a problem loading this post! ⚠️`,
              index: payload.index
            });
        })
      )
    ),
    map(payload => ({
      type: ADD_BODY,
      payload
    }))
  );
