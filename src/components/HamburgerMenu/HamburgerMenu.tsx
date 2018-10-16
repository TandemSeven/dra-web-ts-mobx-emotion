import React, { Component, ChangeEvent, SyntheticEvent } from 'react';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import { NavLink } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';

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
  routerStore: RouterStore;
}

interface HamburgerMenuState {
  [x: string]: string;
}

@inject('globalStore', 'locationStore', 'routerStore')
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
    const currentRoute = window.location.pathname;
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
            color="primary"
            disabled={appState === LOADING || !this.state.zipCode}
            onClick={this.handleSearch}
            type="submit"
            variant="contained"
          >
            Search
          </Button>
        </Form>
        <List>
          <NavLink to={currentRoute === '/settings' ? '/' : '/settings'}>
            <ListItem button={true} onClick={toggleHamburgerMenu}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText
                secondary={currentRoute === '/settings' ? 'Home' : 'Settings'}
              />
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
    );
  }
}
