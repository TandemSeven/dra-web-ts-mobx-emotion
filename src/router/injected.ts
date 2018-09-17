import { RouterStore } from 'mobx-react-router';
import {
  Store,
  StoreProps,
} from '#stores';

export const injectables: Injectables = {
  routerStore: new RouterStore(),
  store: new Store(),
};

export const injectableNames: (keyof Injectables)[] = ['routerStore'];

export interface Injectables {
  store: StoreProps;
  routerStore: RouterStore;
}
