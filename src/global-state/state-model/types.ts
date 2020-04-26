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
}
export enum actionTypes {
  action = 'action',
  listenTo = 'listenTo'
}
export type stateOperator = (
  state: stateModel,
  payload: actionPayload,
  actions?: finalStoreActions
) => stateModel | void;
export type actionSelector = (state: storeActions) => stateAction;
export interface stateAction {
  operator: stateOperator;
  type: actionTypes;
  selector?: actionSelector;
}
export interface finalStoreAction {
  [key: string]: stateOperator;
}
export interface finalStoreActions {
  [key: string]: finalStoreAction;
}
export interface stateActions {
  [key: string]: stateAction;
}

export interface storeActions {
  [key: string]: stateActions;
}
export type finalActionSelector = (state: finalStoreActions) => stateOperator;
export interface reducerAction {
  selector: finalActionSelector;
  payload?: actionPayload;
}
