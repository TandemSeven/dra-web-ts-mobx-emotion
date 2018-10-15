import { observable, action } from 'mobx';

import { UserChosenTheme } from '#types';

export interface UserStoreProps {
  chosenTheme: UserChosenTheme;
  onChangeTheme(chosenTheme: UserChosenTheme): void;
}

export class UserStore {
  @observable
  chosenTheme: UserChosenTheme = null;

  /**
   * @param {string<UserChosenTheme>} chosenTheme
   * @function onChangeTheme
   * - Sets the chosen them to local storage
   */
  @action
  onChangeTheme = (chosenTheme: UserChosenTheme) => {
    this.chosenTheme = chosenTheme;
    localStorage.setItem('chosenTheme', chosenTheme!);
  };
}
