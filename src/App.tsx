import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Router } from 'react-router-dom';
import { History } from 'history';
import { Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import { Root } from '#helpers';
import { Routes } from '#router';
import { GlobalStoreProps } from '#stores';
import { HamburgerMenu } from '#components';
import { MenuIconButton } from '#components/HamburgerMenu/styled';

export interface AppProps {
  history: History;
}

interface InjectedProps extends AppProps {
  globalStore: GlobalStoreProps;
}

@inject('globalStore')
@observer
export class App extends Component<AppProps> {
  get injected(): InjectedProps {
    return this.props as InjectedProps;
  }

  public render() {
    const { history } = this.props;
    const {
      isHamburgerOpen,
      isNotificationOpen,
      message,
      setDone,
      toggleHamburgerMenu,
    } = this.injected.globalStore;
    return (
      <Root>
        <Router history={history}>
          <>
            <MenuIconButton
              aria-label="Open drawer"
              onClick={toggleHamburgerMenu}
            >
              <MenuIcon />
            </MenuIconButton>
            <Routes />
            <HamburgerMenu isOpen={isHamburgerOpen} />
            <Snackbar
              message={<span id="message-id">{message}</span>}
              open={isNotificationOpen}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={() => setDone()}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />
          </>
        </Router>
      </Root>
    );
  }
}
