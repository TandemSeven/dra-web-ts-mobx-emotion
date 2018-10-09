import { RouterStore } from 'mobx-react-router';
import {
  AppStore,
  AppStoreProps,
  LocationStore,
  LocationStoreProps,
  WeatherStore,
  WeatherStoreProps,
} from '#stores';

export const injectables: Injectables = {
  appStore: new AppStore(),
  locationStore: new LocationStore(),
  routerStore: new RouterStore(),
  weatherStore: new WeatherStore(),
};

export const injectableNames: (keyof Injectables)[] = ['routerStore'];

export interface Injectables {
  appStore: AppStoreProps;
  locationStore: LocationStoreProps;
  weatherStore: WeatherStoreProps;
  routerStore: RouterStore;
}
