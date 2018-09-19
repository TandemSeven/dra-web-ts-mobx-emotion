import { action, observable } from 'mobx';
import { State } from '#types';
import { DONE, ERROR, LOADING, PENDING } from '#constants';
import { Notification, NotificationMessage } from '#types';

export interface AppStoreProps {
  isNotificationOpen: boolean;
  message?: NotificationMessage;
  setDone(notification?: Notification): void;
  setError(notification?: Notification): void;
  setLoading(notification?: Notification): void;
  setPending(): void;
}

export class AppStore {
  @observable state: State = PENDING;
  @observable isNotificationOpen: boolean = false;
  @observable message?: NotificationMessage = undefined;

  @action openNotification() {
    this.isNotificationOpen = true;
  }

  @action closeNotification() {
    this.isNotificationOpen = false;
  }

  @action setDone(notification?: Notification) {
    const message = notification && notification.message;

    this.state = DONE;
    this.message = message;
    this.closeNotification();
  }

  @action setError(notification?: Notification) {
    const message = notification && notification.message;

    this.state = ERROR;
    this.openNotification();
    this.message = message;
  }

  @action setLoading(notification?: Notification) {
    const message = notification && notification.message;

    this.state = LOADING;
    this.openNotification();
    this.message = message;
  }

  @action setPending() {
    this.state = PENDING;
    this.closeNotification();
  }
}
