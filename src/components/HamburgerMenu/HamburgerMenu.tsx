import React, { Component, ChangeEvent, SyntheticEvent } from 'react';
import { inject, observer } from 'mobx-react';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';

import { Button, H1 } from '#components';
import { DrawerClasses, Form } from './styled';
import { GlobalStoreProps, LocationStoreProps } from '#stores';
import { LOADING } from '#constants';

export interface HamburgerMenuProps {
  isOpen: boolean;
}

interface InjectedProps extends HamburgerMenuProps {
  globalStore: GlobalStoreProps;
  locationStore: LocationStoreProps;
}

interface HamburgerMenuState {
  [x: string]: string;
}

@inject('globalStore', 'locationStore')
@observer
export class HamburgerMenu extends Component<
  HamburgerMenuProps,
  HamburgerMenuState
> {
  state: HamburgerMenuState = {
    zipCode: '',
  };
  get injected(): InjectedProps {
    return this.props as InjectedProps;
  }
  handleChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [name]: e.target.value,
    });
  };
  handleSearch = (e: SyntheticEvent) => {
    const { updateCityByZip } = this.injected.locationStore;
    e.preventDefault();
    updateCityByZip(this.state.zipCode);
  };
  render() {
    const {
      isHamburgerOpen,
      appState,
      toggleHamburgerMenu,
    } = this.injected.globalStore;
    return (
      <Drawer
        anchor="right"
        classes={DrawerClasses}
        open={isHamburgerOpen}
        onClose={toggleHamburgerMenu}
      >
        <Form>
          <H1>WeatherVane</H1>
          <TextField
            label="Search by Zipcode"
            margin="normal"
            onChange={this.handleChange('zipCode')}
            placeholder="Search by Zipcode"
            type="number"
            value={this.state.zipCode}
            variant="outlined"
          />
          <Button
            disabled={appState === LOADING || !this.state.zipCode}
            onClick={this.handleSearch}
            variant="contained"
          >
            Search
          </Button>
        </Form>
      </Drawer>
    );
  }
}
