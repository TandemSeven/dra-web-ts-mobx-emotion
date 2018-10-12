import React, { Component, SyntheticEvent } from 'react';
import { inject, observer } from 'mobx-react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { UserStoreProps } from '#stores';
import { PRIMARY, SECONDARY, TERTIARY } from '#constants';
import { UserChosenTheme } from '#types';
import { SettingsWrapper, SettingsContainer } from './styled';
import { Grid } from '@material-ui/core';

interface InjectedProps extends SettingsProps {
  userStore: UserStoreProps;
}

export interface SettingsProps {}

@inject('userStore')
@observer
export class Settings extends Component<SettingsProps> {
  get injected(): InjectedProps {
    return this.props as InjectedProps;
  }

  handleThemeSelect = (event: SyntheticEvent, chosenTheme: UserChosenTheme) => {
    const { onChangeTheme } = this.injected.userStore;
    onChangeTheme(chosenTheme);
  };

  render() {
    const chosenTheme =
      this.injected.userStore.chosenTheme ||
      localStorage.getItem('chosenTheme');

    return (
      <SettingsWrapper container={true}>
        <h1>Settings</h1>
        <SettingsContainer>
          <h2>Choose a theme:</h2>
          <ToggleButtonGroup
            value="left"
            exclusive={true}
            onChange={this.handleThemeSelect}
          >
            <ToggleButton selected={chosenTheme === PRIMARY} value={PRIMARY}>
              Primary
            </ToggleButton>
            <ToggleButton
              selected={chosenTheme === SECONDARY}
              value={SECONDARY}
            >
              Secondary
            </ToggleButton>
            <ToggleButton selected={chosenTheme === TERTIARY} value={TERTIARY}>
              Tertiary
            </ToggleButton>
          </ToggleButtonGroup>
        </SettingsContainer>
      </SettingsWrapper>
    );
  }
}
