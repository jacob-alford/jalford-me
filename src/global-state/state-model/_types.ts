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
 *  Post State
 *
 */
export interface blogPost {
  id: string;
  body: string | null;
  title: string;
  tags: string[];
  date: Date;
  public: boolean;
  category: string;
}
export interface blogPayload {
  type: payloadType<actors.postActors>;
  payload: blogPost[];
}
export interface addBodyBlogPayload {
  type: payloadType<actors.postActors>;
  payload: {
    index: number;
    body: string;
  };
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
export interface emptyPayload<actors> {
  type: payloadType<actors>;
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
  errors = 'errors',
  posts = 'posts',
  general = 'general'
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
  | indexPayload<actors.errorActors>
  | indexPayload<actors.postActors>
  | blogPayload
  | addBodyBlogPayload;

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
  [domains.posts]: storeActionCategory<blogPayload & indexPayload<actors.postActors>>;
  [domains.general]: storeActionCategory<emptyPayload<actors.generalActors>>;
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
  posts: blogPost[];
}
