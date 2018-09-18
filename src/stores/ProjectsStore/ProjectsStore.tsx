import { action, observable } from 'mobx';
import { Project } from '#types';

const json = [
  {
    id: 'skdfjh342k3jh',
    name: 'Morgan Stanley',
    hours: 6,
    location: 'New York',
    discipline: 'UX Design',
  },
  {
    id: 'asdsf9ds9876sdf',
    name: 'JP Morgan',
    hours: 2,
    location: 'New York',
    discipline: 'Sales Support',
  },
];

export interface ProjectsStoreProps {
  projects: Project[];
  getActiveProjects(): void;
}

export class ProjectsStore {
  @observable projects: Project[] = [];

  @action
  getActiveProjects() {
    this.projects = json;
    return this.projects;
  }
}
