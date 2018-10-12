import { observable, action } from 'mobx';

import { UserChosenTheme } from '#types';
import { PRIMARY } from '#constants';

export interface UserStoreProps {
  chosenTheme: UserChosenTheme;
  onChangeTheme(chosenTheme: UserChosenTheme): void;
}

export class UserStore {
  @observable
  chosenTheme: UserChosenTheme = PRIMARY;

  @action
  onChangeTheme = (chosenTheme: UserChosenTheme) => {
    this.chosenTheme = chosenTheme;
  };
}
