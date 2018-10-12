import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { ThemeProvider } from 'emotion-theming';

import { UserStoreProps } from '#stores';

import { primaryTheme, secondaryTheme, tertiaryTheme } from '#themes';

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
    const { chosenTheme } = this.injected.userStore;
    const map = {
      primaryTheme,
      secondaryTheme,
      tertiaryTheme,
    };
    return (
      <ThemeProvider theme={map[chosenTheme]}>
        {this.props.children}
      </ThemeProvider>
    );
  }
}
