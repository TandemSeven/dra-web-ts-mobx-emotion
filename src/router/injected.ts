import { RouterStore } from 'mobx-react-router';
import { CalendarStore, CalendarStoreProps, ProjectsStore, ProjectsStoreProps } from '#stores';

export const injectables: Injectables = {
	routerStore: new RouterStore(),
	calendarStore: new CalendarStore(),
	projectsStore: new ProjectsStore(),
};

export const injectableNames: (keyof Injectables)[] = ['routerStore'];

export interface Injectables {
	calendarStore: CalendarStoreProps;
	projectsStore: ProjectsStoreProps;
	routerStore: RouterStore;
}
