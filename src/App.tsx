import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { History } from 'history';

import { Root } from '#helpers';
import { Routes } from '#router';

export interface AppProps {
  history: History;
}

export class App extends Component<AppProps> {
  public render() {
    const { history } = this.props;
    return (
      <Root>
        <Router history={history}>
          <>
            <Routes />
          </>
        </Router>
      </Root>
    );
  }
}
