import { RouterStore } from 'mobx-react-router';
import {
  AppStore,
  AppStoreProps,
  WeatherStore,
  WeatherStoreProps,
} from '#stores';

export const injectables: Injectables = {
  appStore: new AppStore(),
  routerStore: new RouterStore(),
  weatherStore: new WeatherStore(),
};

export const injectableNames: (keyof Injectables)[] = ['routerStore'];

export interface Injectables {
  appStore: AppStoreProps;
  weatherStore: WeatherStoreProps;
  routerStore: RouterStore;
}
