import { domains, payloadType as pt } from './_types';
/*
 * User Actors
 */
export enum userActors {
  userSync = 'userSync',
  logoutUser = 'logoutUser',
  loginUser = 'loginUser',
  authSync = 'authSync',
  triggerUserSync = 'triggerUserSync',
  updateUser = 'updateUser'
}
export const TRIG_USER_SYNC: pt<userActors> = [domains.user, userActors.triggerUserSync];
export const USER_SYNC: pt<userActors> = [domains.user, userActors.userSync];
export const USER_LOGOUT: pt<userActors> = [domains.user, userActors.logoutUser];
export const USER_LOGIN: pt<userActors> = [domains.user, userActors.loginUser];
export const AUTH_SYNC: pt<userActors> = [domains.user, userActors.authSync];
export const UPDATE_USER: pt<userActors> = [domains.user, userActors.updateUser];

/*
 * Notifications Actors
 */
export enum notificationActors {
  add = 'add',
  remove = 'remove'
}
export const NOTIF_ADD: pt<notificationActors> = [
  domains.notifications,
  notificationActors.add
];
export const NOTIF_REM: pt<notificationActors> = [
  domains.notifications,
  notificationActors.remove
];

/*
 * Theme Actors
 */
export enum themeActors {
  toggle = 'toggle',
  togInt = 'togInt'
}
export const THEME_TOG: pt<themeActors> = [domains.theme, themeActors.toggle];
export const THEME_TOG_INT: pt<themeActors> = [domains.theme, themeActors.togInt];

/*
 * Header Actors
 */
export enum headerActors {
  toggle = 'toggle'
}
export const HEAD_TOG: pt<headerActors> = [domains.header, headerActors.toggle];

/*
 * Error Actors
 */
export enum errorActors {
  setError = 'setError'
}
export const SET_ERROR: pt<errorActors> = [domains.errors, errorActors.setError];

/*
 * Post Actors
 */
export enum postActors {
  concatPosts = 'concatPosts',
  addPostBody = 'addPostBody',
  addPostComments = 'addPostComments',
  triggerBodyUpdate = 'triggerBodyUpdate'
}
export const CONCAT_POSTS: pt<postActors> = [domains.posts, postActors.concatPosts];
export const ADD_BODY: pt<postActors> = [domains.posts, postActors.addPostBody];
export const TRIG_BODY_UPDATE: pt<postActors> = [
  domains.posts,
  postActors.triggerBodyUpdate
];
export const ADD_COMMENTS: pt<postActors> = [domains.posts, postActors.addPostComments];

/*
 * General Actors
 */
export enum generalActors {
  initialLoad = 'initialLoad'
}
export const INITIAL_LOAD: pt<generalActors> = [
  domains.general,
  generalActors.initialLoad
];
