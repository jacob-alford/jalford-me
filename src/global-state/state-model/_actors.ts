import { domains, payloadType as pt } from './_types';
/*
 * User Actors
 */
export enum userActors {
  syncUser = 'syncUser',
  logoutUser = 'logoutUser',
  loginUser = 'loginUser'
}
export const USER_SYNC: pt<userActors> = [domains.user, userActors.syncUser];
export const USER_LOGOUT: pt<userActors> = [domains.user, userActors.logoutUser];
export const USER_LOGIN: pt<userActors> = [domains.user, userActors.loginUser];

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
  toggle = 'toggle'
}
export const THEME_TOG: pt<themeActors> = [domains.theme, themeActors.toggle];

/*
 * Header Actors
 */
export enum headerActors {
  toggle = 'toggle'
}
export const HEAD_TOG: pt<headerActors> = [domains.header, headerActors.toggle];
