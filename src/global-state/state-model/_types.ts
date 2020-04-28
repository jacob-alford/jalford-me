/*
 *  User State
 *
 */
export enum puzzleList {
  '19-2-22',
  '19-2-26',
  '19-3-3'
}
export interface userDetails {
  uid: string;
  color: string;
  image: string;
  permissions: { value: number };
  username: string;
  puzzles: puzzleList[];
}
export interface userState {
  hydrated: boolean;
  loggedIn: boolean;
  details: userDetails;
}

/*
 *  Notification State
 *
 */
export enum alertEnum {
  error = 'error',
  warning = 'warning',
  info = 'info',
  success = 'success'
}
export interface notificationDetails {
  body: string;
  alertType: alertEnum;
  timeout: number;
  timeoutColor: string[];
  uid: string;
}

/*
 *  Theme State
 *
 */
export enum themeState {
  light = 'light',
  dark = 'dark'
}

/* ------------------ */

/*
 * Store actions
 *
 */

export type actionSelector = (actions: storeActions) => action;
export type actionPayload = {
  user?: userDetails;
  notification?: notificationDetails;
  theme?: themeState;
};

export type actionConstructor = (
  store: globalStore,
  actions: storeActions,
  payload: actionPayload
) => void | Promise<void>;

export type action = (
  store: globalStore,
  actions: storeActions,
  payload: actionPayload
) => globalStore | Promise<globalStore>;

export interface actionCategory {
  [key: string]: action;
}

export interface storeActions {
  [key: string]: actionCategory;
}

/*
 * Global store
 *
 */

export interface globalStore {
  user: userState;
  notifications: notificationDetails[];
  theme: themeState;
  headerIsOpen: boolean;
}

export type globalStoreSelector = (store: globalStore) => any;
