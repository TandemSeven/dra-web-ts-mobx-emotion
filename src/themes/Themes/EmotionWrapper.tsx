import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { ThemeProvider } from 'emotion-theming';

import { primaryTheme, secondaryTheme, tertiaryTheme } from '#themes';
import { UserStoreProps } from '#stores';
import { PRIMARY } from '#constants';

interface InjectedProps extends EmotionWrapperProps {
  userStore: UserStoreProps;
}

export interface EmotionWrapperProps {}

@inject('userStore')
@observer
export class EmotionWrapper extends Component<EmotionWrapperProps> {
  get injected(): InjectedProps {
    return this.props as InjectedProps;
  }
  render() {
    const chosenTheme =
      this.injected.userStore.chosenTheme ||
      localStorage.getItem('chosenTheme') ||
      PRIMARY;

    const map: any = {
      primaryTheme,
      secondaryTheme,
      tertiaryTheme,
    };
    return (
      <ThemeProvider theme={map[chosenTheme!]}>
        {this.props.children}
      </ThemeProvider>
    );
  }
}
