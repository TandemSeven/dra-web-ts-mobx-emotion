import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { primaryTheme, secondaryTheme, tertiaryTheme } from '#themes';
import { UserStoreProps } from '#stores';

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
    const chosenTheme =
      this.injected.userStore.chosenTheme ||
      localStorage.getItem('chosenTheme');

    const map: any = {
      primaryTheme,
      secondaryTheme,
      tertiaryTheme,
    };
    return (
      <MuiThemeProvider theme={map[chosenTheme!]}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}
