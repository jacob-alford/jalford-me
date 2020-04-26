import makeReducer from './reducer';
import produce from 'immer';
import {
  finalStoreActions,
  storeActions as storeActionsType,
  finalStoreAction,
  themeState,
  puzzleList,
  alertEnum,
  stateModel,
  actionPayload
} from '../state-model/types';

const initialState = {
  user: {
    hydrated: false,
    loggedIn: false,
    details: {
      uid: '',
      color: '',
      image: '',
      permissions: { value: 0 },
      username: '',
      puzzles: []
    }
  },
  notifications: [],
  theme: themeState.light
};

const operators: finalStoreActions = {
  user: {
    login: produce((state, { user }) => {
      if (!user) throw new Error('Payload.user is required to login!');
      state.user.details = user;
      state.user.loggedIn = true;
      state.user.hydrated = true;
    }),
    logout: produce((state, { user }) => {
      state.user.details = initialState.user.details;
      state.user.loggedIn = false;
      state.user.hydrated = true;
    })
  },
  notifications: {
    add: produce((state, { notification }) => {
      if (!notification)
        throw new Error('Payload.notification is required to add a notification!');
      if (typeof notification === 'string')
        throw new Error(
          'Payload.notification needs to be a notification object to construct a notification!'
        );
      state.notifications.unshift(notification);
    }),
    remove: produce((state, { notification }) => {
      if (!notification)
        throw new Error('Payload.notification is required to remove a notification!');
      if (typeof notification !== 'string')
        throw new Error(
          'Payload.notification needs to be a notification UID to remove a notification!'
        );
      state.notifications = state.notifications.filter(
        (not: { uid: string }) => not.uid !== notification
      );
    })
  },
  theme: {
    toggle: produce(state => {
      if (state.theme === themeState.light) state.theme = themeState.dark;
      else state.theme = themeState.light;
    })
  }
};

const stateReducer = makeReducer(operators);

describe('global-state-reducer functions properly', () => {
  it('throws with unrecognized state', async () => {
    await expect(() =>
      stateReducer(initialState, {
        selector: (storeActions: finalStoreActions) => storeActions.user.butthole
      })
    ).toThrow(`Unknown store selector: storeActions => storeActions.user.butthole`);
  });
  it('mutates user state', async () => {
    await expect(() =>
      stateReducer(initialState, {
        selector: (storeActions: finalStoreActions) => storeActions.user.login
      })
    ).toThrow('Payload.user is required to login!');
    expect(
      await stateReducer(initialState, {
        selector: (storeActions: finalStoreActions) => storeActions.user.login,
        payload: {
          user: {
            uid: '1234',
            color: 'red',
            image: 'src/img.jpg',
            permissions: { value: 69 },
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
          permissions: { value: 69 },
          username: 'jacob',
          puzzles: [puzzleList['19-2-22']]
        }
      },
      notifications: [],
      theme: themeState.light
    });
    expect(
      await stateReducer(initialState, {
        selector: (storeActions: finalStoreActions) => storeActions.user.logout
      })
    ).toStrictEqual({
      user: {
        hydrated: true,
        loggedIn: false,
        details: {
          uid: '',
          color: '',
          image: '',
          permissions: { value: 0 },
          username: '',
          puzzles: []
        }
      },
      notifications: [],
      theme: themeState.light
    });
  });
  it('mutates notification state', async () => {
    await expect(() =>
      stateReducer(initialState, {
        selector: (storeActions: finalStoreActions) => storeActions.notifications.add
      })
    ).toThrow('Payload.notification is required to add a notification!');
    await expect(() =>
      stateReducer(initialState, {
        selector: (storeActions: finalStoreActions) => storeActions.notifications.add,
        payload: { notification: '1234' }
      })
    ).toThrow(
      'Payload.notification needs to be a notification object to construct a notification!'
    );
    await expect(() =>
      stateReducer(initialState, {
        selector: (storeActions: finalStoreActions) => storeActions.notifications.remove
      })
    ).toThrow('Payload.notification is required to remove a notification!');
    await expect(() =>
      stateReducer(initialState, {
        selector: (storeActions: finalStoreActions) => storeActions.notifications.remove,
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
    const addedState = await stateReducer(initialState, {
      selector: (storeActions: finalStoreActions) => storeActions.notifications.add,
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
          permissions: { value: 0 },
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
    const removeState = await stateReducer(addedState, {
      selector: (storeActions: finalStoreActions) => storeActions.notifications.remove,
      payload: { notification: '1234' }
    });
    expect(removeState).toStrictEqual(initialState);
  });
  it('mutates theme state', async () => {
    expect(
      await stateReducer(initialState, {
        selector: (storeActions: finalStoreActions) => storeActions.theme.toggle
      })
    ).toStrictEqual({
      user: {
        hydrated: false,
        loggedIn: false,
        details: {
          uid: '',
          color: '',
          image: '',
          permissions: { value: 0 },
          username: '',
          puzzles: []
        }
      },
      notifications: [],
      theme: themeState.dark
    });
  });
});
