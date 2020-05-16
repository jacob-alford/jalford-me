import {
  globalStore,
  themeState,
  storeActions as storeActionsType
} from './state-model/_types';
import notifications from './state-model/notification-actions';
import general from './state-model/general-actions';
import errors from './state-model/error-actions';
import header from './state-model/header-actions';
import theme from './state-model/theme-actions';
import posts from './state-model/post-actions';
import user from './state-model/user-actions';

const getDefaultThemeState = (): themeState => {
  const light = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)');
  const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  const isNightTime = (() => {
    const time = new Date().getHours();
    return time < 6 || time > 20;
  })();
  const themeStorage = window.localStorage.getItem('theme');
  const manuallySet =
    (themeStorage === themeState.light && themeState.light) ||
    (themeStorage === themeState.dark && themeState.dark);
  const prefersLight = light && light.matches && themeState.light;
  const prefersDark = dark && dark.matches && themeState.dark;
  const fallback = isNightTime ? themeState.dark : themeState.light;
  return manuallySet || prefersLight || prefersDark || fallback;
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
  errors: [],
  posts: []
};

export const storeActions: storeActionsType = {
  notifications,
  general,
  errors,
  header,
  theme,
  posts,
  user
};
