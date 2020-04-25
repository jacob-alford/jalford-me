import { stateReducer } from '../global-state';
import {
  storeActions as actionType,
  themeState,
  puzzleList,
  alertEnum
} from '../state-model/types';

export const initialState = {
  user: {
    hydrated: false,
    loggedIn: false,
    details: {
      uid: '',
      color: '',
      image: '',
      permissions: 0,
      username: '',
      puzzles: []
    }
  },
  notifications: [],
  theme: themeState.light
};

describe('global-state-reducer functions properly', () => {
  it('throws with unrecognized state', () => {
    expect(() =>
      stateReducer(initialState, {
        selector: (storeActions: actionType) => storeActions.user.butthole
      })
    ).toThrow(`Unknown store selector: storeActions => storeActions.user.butthole`);
  });
  it('mutates user state', () => {
    expect(() =>
      stateReducer(initialState, {
        selector: (storeActions: actionType) => storeActions.user.login
      })
    ).toThrow('Payload.user is required to login!');
    expect(
      stateReducer(initialState, {
        selector: (storeActions: actionType) => storeActions.user.login,
        payload: {
          user: {
            uid: '1234',
            color: 'red',
            image: 'src/img.jpg',
            permissions: 69,
            username: 'jacob',
            puzzles: [puzzleList['19-2-22']]
          }
        }
      })
    ).toStrictEqual({
      user: {
        hydrated: true,
        loggedIn: true,
        details: {
          uid: '1234',
          color: 'red',
          image: 'src/img.jpg',
          permissions: 69,
          username: 'jacob',
          puzzles: [puzzleList['19-2-22']]
        }
      },
      notifications: [],
      theme: themeState.light
    });
    expect(
      stateReducer(initialState, {
        selector: (storeActions: actionType) => storeActions.user.logout
      })
    ).toStrictEqual({
      user: {
        hydrated: true,
        loggedIn: false,
        details: {
          uid: '',
          color: '',
          image: '',
          permissions: 0,
          username: '',
          puzzles: []
        }
      },
      notifications: [],
      theme: themeState.light
    });
  });
  it('mutates notification state', () => {
    expect(() =>
      stateReducer(initialState, {
        selector: (storeActions: actionType) => storeActions.notifications.add
      })
    ).toThrow('Payload.notification is required to add a notification!');
    expect(() =>
      stateReducer(initialState, {
        selector: (storeActions: actionType) => storeActions.notifications.add,
        payload: { notification: '1234' }
      })
    ).toThrow(
      'Payload.notification needs to be a notification object to construct a notification!'
    );
    expect(() =>
      stateReducer(initialState, {
        selector: (storeActions: actionType) => storeActions.notifications.remove
      })
    ).toThrow('Payload.notification is required to remove a notification!');
    expect(() =>
      stateReducer(initialState, {
        selector: (storeActions: actionType) => storeActions.notifications.remove,
        payload: {
          notification: {
            body: 'ripped',
            alertType: alertEnum.info,
            timeout: Infinity,
            timeoutColor: ['red', 'blue'],
            uid: '1234'
          }
        }
      })
    ).toThrow(
      'Payload.notification needs to be a notification UID to remove a notification!'
    );
    const addedState = stateReducer(initialState, {
      selector: (storeActions: actionType) => storeActions.notifications.add,
      payload: {
        notification: {
          body: 'ripped',
          alertType: alertEnum.info,
          timeout: Infinity,
          timeoutColor: ['red', 'blue'],
          uid: '1234'
        }
      }
    });
    expect(addedState).toStrictEqual({
      user: {
        hydrated: false,
        loggedIn: false,
        details: {
          uid: '',
          color: '',
          image: '',
          permissions: 0,
          username: '',
          puzzles: []
        }
      },
      notifications: [
        {
          body: 'ripped',
          alertType: alertEnum.info,
          timeout: Infinity,
          timeoutColor: ['red', 'blue'],
          uid: '1234'
        }
      ],
      theme: themeState.light
    });
    const removeState = stateReducer(addedState, {
      selector: (storeActions: actionType) => storeActions.notifications.remove,
      payload: { notification: '1234' }
    });
    expect(removeState).toStrictEqual(initialState);
  });
  it('mutates theme state', () => {
    expect(
      stateReducer(initialState, {
        selector: (storeActions: actionType) => storeActions.theme.toggle
      })
    ).toStrictEqual({
      user: {
        hydrated: false,
        loggedIn: false,
        details: {
          uid: '',
          color: '',
          image: '',
          permissions: 0,
          username: '',
          puzzles: []
        }
      },
      notifications: [],
      theme: themeState.dark
    });
  });
});
