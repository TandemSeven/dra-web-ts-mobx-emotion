import { DONE, ERROR, LOADING, PENDING } from '#constants';

export type State =
  | typeof DONE
  | typeof ERROR
  | typeof LOADING
  | typeof PENDING;

export interface LocationDetails {
  city?: string;
  lat?: number;
  lon?: number;
  region?: string;
  regionName?: string;
}

export type NotificationMessage = string | undefined;

export interface Notification {
  message?: NotificationMessage;
}

export interface CurrentEndPoints {
  forecast?: string;
  forecastHourly?: string;
}
