import { RouterStore } from 'mobx-react-router';
import {
  GlobalStore,
  GlobalStoreProps,
  LocationStore,
  LocationStoreProps,
  WeatherStore,
  WeatherStoreProps,
} from '#stores';

export const injectables: Injectables = {
  globalStore: new GlobalStore(),
  locationStore: new LocationStore(),
  routerStore: new RouterStore(),
  weatherStore: new WeatherStore(),
};

export const injectableNames: (keyof Injectables)[] = ['routerStore'];

export interface Injectables {
  globalStore: GlobalStoreProps;
  locationStore: LocationStoreProps;
  weatherStore: WeatherStoreProps;
  routerStore: RouterStore;
}
