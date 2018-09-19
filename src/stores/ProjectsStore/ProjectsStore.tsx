import { action, observable, runInAction } from 'mobx';
import { Project } from '#types';
import { injectables } from '#router';

import { getFakeProjects } from '#mocks';

export interface ProjectsStoreProps {
  projects: Project[];
  getActiveProjects(): void;
}

export class ProjectsStore {
  @observable projects: any = [];

  @action
  getActiveProjects = async () => {
    try {
      injectables.appStore.setLoading({ message: 'Loading Projects...' });

      // this is a fake response
      const response = await getFakeProjects();

      runInAction('getActiveProjectsSuccess', () => {
        this.projects = response || [];
        injectables.appStore.setDone();
      });
    } catch (err) {
      injectables.appStore.setError({ message: `Err: ${err}` });
    }
  }
}
