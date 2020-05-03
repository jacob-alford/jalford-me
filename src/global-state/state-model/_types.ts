import * as actors from './_actors';
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
export interface userPayload {
  type: payloadType<actors.userActors>;
  payload: userDetails;
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
export interface notificationPayload {
  type: payloadType<actors.notificationActors>;
  payload: notificationDetails;
}

/*
 *  Theme State
 *
 */
export enum themeState {
  light = 'light',
  dark = 'dark'
}
export interface themePayload {
  type: payloadType<actors.themeActors>;
  payload: null;
}

/*
 *  Header State
 *
 */
export interface headerPayload {
  type: payloadType<actors.headerActors>;
  payload: null;
}

/*
 *  Error State
 *
 */
export interface storeError {
  message: string;
  raw: Error;
}
export interface errorPayload {
  type: payloadType<actors.errorActors>;
  payload: storeError;
}

/*
 * Generic Payloads
 */
export interface indexPayload<actors> {
  type: payloadType<actors>;
  payload: number;
}
export interface stringPayload<actors> {
  type: payloadType<actors>;
  payload: string;
}
export interface mutatePayload<actors> {
  type: payloadType<actors>;
  payload: actionConstructor<null>;
}

/* ------------------ */

/*
 * Store actions
 *
 */

export enum domains {
  user = 'user',
  theme = 'theme',
  notifications = 'notifications',
  header = 'header',
  errors = 'errors'
}

export type payloadType<actors> = [domains, actors];

export type actionPayload =
  | userPayload
  | stringPayload<actors.userActors>
  | mutatePayload<actors.userActors>
  | notificationPayload
  | themePayload
  | headerPayload
  | errorPayload
  | indexPayload<actors.errorActors>;

export type actionConstructor<payloadType> = (
  store: globalStore,
  payload: payloadType
) => void;
export type action<payloadType> = (
  store: globalStore,
  payload: payloadType
) => globalStore;

export interface storeActionCategory<payloadType> {
  [key: string]: action<payloadType>;
}

export interface storeActions {
  [domains.user]: storeActionCategory<
    userPayload & stringPayload<actors.userActors> & mutatePayload<actors.userActors>
  >;
  [domains.notifications]: storeActionCategory<notificationPayload>;
  [domains.theme]: storeActionCategory<themePayload>;
  [domains.header]: storeActionCategory<headerPayload>;
  [domains.errors]: storeActionCategory<errorPayload & indexPayload<actors.errorActors>>;
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
  errors: storeError[];
}
