import {
  globalStore,
  themeState,
  storeActions as storeActionsType
} from './state-model/_types';
import user from './state-model/user-actions';
import notifications from './state-model/notification-actions';
import theme from './state-model/theme-actions';
import header from './state-model/header-actions';
import errors from './state-model/error-actions';

const getDefaultThemeState = (): themeState => {
  const light = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)');
  const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  const isNightTime = (() => {
    const time = new Date().getHours();
    return time < 6 || time > 20;
  })();
  return light && light.matches
    ? themeState.light
    : dark && dark.matches
    ? themeState.dark
    : isNightTime
    ? themeState.dark
    : themeState.light;
};

export const defaultState: globalStore = {
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
  theme: getDefaultThemeState(),
  headerIsOpen: true,
  errors: []
};

export const storeActions: storeActionsType = {
  user,
  notifications,
  theme,
  header,
  errors
};
