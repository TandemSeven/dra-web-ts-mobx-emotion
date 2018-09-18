import { RouterStore } from 'mobx-react-router';
import { CalendarStore, CalendarStoreProps } from '#stores';

export const injectables: Injectables = {
	routerStore: new RouterStore(),
	calendarStore: new CalendarStore(),
};

export const injectableNames: (keyof Injectables)[] = [ 'routerStore' ];

export interface Injectables {
	calendarStore: CalendarStoreProps;
	routerStore: RouterStore;
}
