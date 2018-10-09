import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { GlobalStoreProps } from '#stores';

export interface HamburgerMenuProps {
  isOpen: boolean;
}

interface InjectedProps extends HamburgerMenuProps {
  globalStore: GlobalStoreProps;
}

@inject('globalStore')
@observer
export class HamburgerMenu extends Component<HamburgerMenuProps> {
  get injected(): InjectedProps {
    return this.props as InjectedProps;
  }
  render() {
    const { isHamburgerOpen, toggleHamburgerMenu } = this.injected.globalStore;
    return (
      <SwipeableDrawer
        anchor="right"
        open={isHamburgerOpen}
        onClose={toggleHamburgerMenu}
        onOpen={toggleHamburgerMenu}
      >
        <div tabIndex={0} role="button" onClick={() => {}} onKeyDown={() => {}}>
          yo
        </div>
      </SwipeableDrawer>
    );
  }
}
