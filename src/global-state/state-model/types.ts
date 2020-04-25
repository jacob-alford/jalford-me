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
  permissions: number;
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
export interface notification {
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

export interface stateModel {
  user: userState;
  notifications: notification[];
  theme: themeState;
}

export interface actionPayload {
  user?: userDetails;
  notification?: notification | string;
  theme?: themeState;
}
export type stateAction = (state: stateModel, payload: actionPayload) => stateModel;

export interface stateActions {
  [key: string]: stateAction;
}

export interface storeActions {
  user: stateActions;
  notifications: stateActions;
  theme: stateActions;
}
export type actionSelector = (state: storeActions) => stateAction;
export interface reducerAction {
  selector: actionSelector;
  payload: actionPayload;
}
