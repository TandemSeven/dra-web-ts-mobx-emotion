import { RouterStore } from 'mobx-react-router';
import {
  GlobalStore,
  GlobalStoreProps,
  LocationStore,
  LocationStoreProps,
  UserStore,
  UserStoreProps,
  WeatherStore,
  WeatherStoreProps,
} from '#stores';

export const injectables: Injectables = {
  globalStore: new GlobalStore(),
  locationStore: new LocationStore(),
  routerStore: new RouterStore(),
  userStore: new UserStore(),
  weatherStore: new WeatherStore(),
};

export const injectableNames: (keyof Injectables)[] = ['routerStore'];

export interface Injectables {
  globalStore: GlobalStoreProps;
  locationStore: LocationStoreProps;
  weatherStore: WeatherStoreProps;
  userStore: UserStoreProps;
  routerStore: RouterStore;
}
