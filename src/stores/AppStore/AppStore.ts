import { action, observable, runInAction } from 'mobx';
import { injectables } from '#router';
import { State } from '#types';
import { DONE, ERROR, LOADING, PENDING } from '#constants';
import { Notification, NotificationMessage } from '#types';

export interface AppStoreProps {
  init(): void;
  isNotificationOpen: boolean;
  message?: NotificationMessage;
  setDone(notification?: Notification): void;
  setError(notification?: Notification): void;
  setLoading(notification?: Notification): void;
  setPending(): void;
}

export class AppStore {
  @observable
  state: State = PENDING;

  @observable
  isNotificationOpen: boolean = false;

  @observable
  message?: NotificationMessage = undefined;

  // notifications and state
  // =======================
  @action
  openNotification() {
    this.isNotificationOpen = true;
  }

  @action
  closeNotification() {
    this.isNotificationOpen = false;
  }

  @action
  setDone(notification?: Notification) {
    const message = notification && notification.message;

    this.state = DONE;
    this.message = message;
    this.closeNotification();
  }

  @action
  setError(notification?: Notification) {
    const message = notification && notification.message;

    this.state = ERROR;
    this.openNotification();
    this.message = message;
  }

  @action
  setLoading(notification?: Notification) {
    const message = notification && notification.message;

    this.state = LOADING;
    this.openNotification();
    this.message = message;
  }

  @action
  setPending() {
    this.state = PENDING;
    this.closeNotification();
  }

  /**
   * @function init
   * - fetch the users current location and coordinates and
   * get the hourly forecast. Nested async calls are necessary
   */
  init = async () => {
    this.setLoading({ message: 'Loading Current Weather...' });
    await injectables.locationStore.getCurrentLocation();
    await injectables.locationStore.getCityImages();
    await injectables.weatherStore.getHourlyForecast();
    await injectables.weatherStore.getDailyForecast();
    this.setDone();
  };
}
