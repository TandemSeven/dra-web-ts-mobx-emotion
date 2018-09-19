import { DONE, ERROR, LOADING, PENDING } from '#constants';

export type State = typeof DONE | typeof ERROR | typeof LOADING | typeof PENDING;

export type NotificationMessage = string | undefined;

export interface Notification {
  message?: NotificationMessage;
}
