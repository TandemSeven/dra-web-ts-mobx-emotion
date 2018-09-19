import { RouterStore } from 'mobx-react-router';
import { AppStore, AppStoreProps, CalendarStore, CalendarStoreProps, ProjectsStore, ProjectsStoreProps } from '#stores';

export const injectables: Injectables = {
	appStore: new AppStore(),
	routerStore: new RouterStore(),
	calendarStore: new CalendarStore(),
	projectsStore: new ProjectsStore(),
};

export const injectableNames: (keyof Injectables)[] = ['routerStore'];

export interface Injectables {
	appStore: AppStoreProps;
	calendarStore: CalendarStoreProps;
	projectsStore: ProjectsStoreProps;
	routerStore: RouterStore;
}
