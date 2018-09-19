import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Router } from 'react-router-dom';
import { History } from 'history';
import { Snackbar } from '@material-ui/core';

import { Root } from '#helpers';
import { Routes } from '#router';
import { AppStoreProps } from '#stores';

export interface AppProps {
  history: History;
}

interface InjectedProps extends AppProps {
  appStore: AppStoreProps;
}

@inject('appStore')
@observer
export class App extends Component<AppProps> {
  get injected(): InjectedProps {
    return this.props as InjectedProps;
  }

  public render() {
    const { history } = this.props;
    const { isNotificationOpen, message } = this.injected.appStore;
    return (
      <Root>
        <Router history={history}>
          <>
            <Routes />
          </>
        </Router>
        <Snackbar
          open={isNotificationOpen}
          message={<span id='message-id'>{message}</span>}
        />
      </Root>
    );
  }
}
