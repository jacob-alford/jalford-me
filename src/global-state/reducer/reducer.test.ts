// @ts-nocheck
import makeReducer from './reducer';
import { storeActions, defaultState } from '../global-state';
import { domains } from '../state-model/_types';
import { userActors, themeActors } from '../state-model/_actors';

describe('global-store reducer functions properly', () => {
  const storeReducer = makeReducer(storeActions);
  it('throws on unknown state action', () => {
    expect(() =>
      storeReducer(defaultState, {
        type: [domains.user, 'notAFunction'],
        payload: 'goddamnit'
      })
    ).toThrow('Unknown store action, notAFunction');
  });
  it('performs a state update properly', () => {
    expect(
      storeReducer(defaultState, {
        type: [domains.user, userActors.loginUser],
        payload: null
      })
    ).toStrictEqual({
      ...defaultState,
      user: {
        ...defaultState.user,
        loggedIn: true,
        hydrated: true
      }
    });
  });
});
