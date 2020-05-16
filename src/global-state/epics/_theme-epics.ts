import { mapTo, tap } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';

import { THEME_TOG, THEME_TOG_INT } from '../state-model/_actors';
import { themeState } from '../state-model/_types';

/*
 * Synchronizes the theme with localstorage
 * in: THEME_TOG
 * out: THEME_TOG_INT
 */
export const themeTog: Epic = (action$, state$) =>
  action$.pipe(
    ofType(THEME_TOG),
    tap(() => {
      if (state$.value.theme === themeState.light)
        window.localStorage.setItem('theme', themeState.light);
      else window.localStorage.setItem('theme', themeState.dark);
    }),
    mapTo({
      type: THEME_TOG_INT
    })
  );
