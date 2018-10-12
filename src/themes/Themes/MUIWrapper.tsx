import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { UserStoreProps } from '#stores';

import { primaryTheme, secondaryTheme, tertiaryTheme } from '#themes';

interface InjectedProps extends MUIWrapperProps {
  userStore: UserStoreProps;
}

export interface MUIWrapperProps {}

@inject('userStore')
@observer
export class MUIWrapper extends Component<MUIWrapperProps> {
  get injected(): InjectedProps {
    return this.props as InjectedProps;
  }
  render() {
    const { chosenTheme } = this.injected.userStore;
    const map = {
      primaryTheme,
      secondaryTheme,
      tertiaryTheme,
    };
    return (
      <MuiThemeProvider theme={map[chosenTheme]}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}
