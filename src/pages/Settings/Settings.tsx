import React, { Component, SyntheticEvent } from 'react';
import { inject, observer } from 'mobx-react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { H1 } from '#components';
import { UserStoreProps } from '#stores';
import { PRIMARY, SECONDARY, TERTIARY } from '#constants';
import { UserChosenTheme } from '#types';
import { SettingsWrapper } from './styled';

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
    const { chosenTheme } = this.injected.userStore;
    return (
      <SettingsWrapper container={true}>
        <H1>Settings</H1>
        <ToggleButtonGroup
          value="left"
          exclusive={true}
          onChange={this.handleThemeSelect}
        >
          <ToggleButton selected={chosenTheme === PRIMARY} value={PRIMARY}>
            Primary
          </ToggleButton>
          <ToggleButton selected={chosenTheme === SECONDARY} value={SECONDARY}>
            Secondary
          </ToggleButton>
          <ToggleButton selected={chosenTheme === TERTIARY} value={TERTIARY}>
            Tertiary
          </ToggleButton>
        </ToggleButtonGroup>
      </SettingsWrapper>
    );
  }
}
