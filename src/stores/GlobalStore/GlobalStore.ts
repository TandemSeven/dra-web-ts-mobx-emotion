import { action, observable } from 'mobx';
import { injectables } from '#router';
import { AppState } from '#types';
import { DONE, ERROR, LOADING, PENDING } from '#constants';
import { Notification, NotificationMessage } from '#types';

export interface GlobalStoreProps {
  init(): void;
  isNotificationOpen: boolean;
  isHamburgerOpen: boolean;
  message?: NotificationMessage;
  setDone(notification?: Notification): void;
  setError(notification?: Notification): void;
  setLoading(notification?: Notification): void;
  setPending(): void;
  toggleHamburgerMenu(): void;
  appState: AppState;
}

export class GlobalStore {
  @observable
  appState: AppState = PENDING;
  @observable
  isNotificationOpen: boolean = false;
  @observable
  message?: NotificationMessage = undefined;
  @observable
  isHamburgerOpen: boolean = false;

  // notifications and appState
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

    this.appState = DONE;
    this.message = message;
    this.closeNotification();
  }

  @action
  setError(notification?: Notification) {
    const message = notification && notification.message;

    this.appState = ERROR;
    this.openNotification();
    this.message = message;
  }

  @action
  setLoading(notification?: Notification) {
    const message = notification && notification.message;

    this.appState = LOADING;
    this.openNotification();
    this.message = message;
  }

  @action
  setPending() {
    this.appState = PENDING;
    this.closeNotification();
  }

  @action
  toggleHamburgerMenu = () => {
    this.isHamburgerOpen = !this.isHamburgerOpen;
  };

  /**
   * @function init
   * - fetch the users current location and coordinates and
   * get the hourly forecast. Nested async calls are necessary
   */
  init = async () => {
    this.setLoading({ message: 'Loading Current Weather...' });
    try {
      await injectables.locationStore.getCurrentLocation();
      await injectables.locationStore.getCityImages();
      await injectables.weatherStore.getHourlyForecast();
      await injectables.weatherStore.getDailyForecast();
    } catch (err) {
      this.setError({ message: `Err: ${err}` });
    }
    this.setDone();
  };
}
