import { action, observable, runInAction } from 'mobx';
import { injectables } from '#router';
import { State } from '#types';
import { DONE, ERROR, LOADING, PENDING } from '#constants';
import { Notification, NotificationMessage, LocationDetails } from '#types';
import { getLocation } from '#helpers/GetLocation';

export interface AppStoreProps {
  fetchCurrentLocation(): void;
  init(): void;
  isNotificationOpen: boolean;
  locationDetails: LocationDetails;
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

  @observable
  locationDetails: LocationDetails = {};

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

  @action
  fetchCurrentLocation = async () => {
    const locationDetails = await getLocation();
    runInAction(() => {
      this.locationDetails = locationDetails;
    });
  };
  /**
   * @function init
   * - fetch the users current location and coordinates and
   * get the hourly forecast. Nested async calls are necessary
   */
  init = async () => {
    await this.fetchCurrentLocation();
    await injectables.weatherStore.getHourlyForecast();
  };
}
