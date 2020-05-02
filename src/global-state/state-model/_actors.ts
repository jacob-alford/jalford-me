import { domains } from './_types';
/*
 * User Actors
 */
export enum userActors {
  syncUser = 'syncUser'
}
export const USER_SYNC = [domains.user, userActors.syncUser];

/*
 * Notifications Actors
 */
export enum notificationActors {
  add = 'add',
  remove = 'remove'
}
export const NOTIF_ADD = [domains.notifications, notificationActors.add];
export const NOTIF_REM = [domains.notifications, notificationActors.remove];

/*
 * Theme Actors
 */
export enum themeActors {
  toggle = 'toggle'
}
export const THEME_TOG = [domains.theme, themeActors.toggle];

/*
 * Header Actors
 */
export enum headerActors {
  toggle = 'toggle'
}
export const HEAD_TOG = [domains.header, headerActors.toggle];
